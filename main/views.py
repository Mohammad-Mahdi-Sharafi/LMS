from django.db.models import Q
from django.utils.decorators import method_decorator
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, get_object_or_404
from rest_framework import permissions
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response

from .models import Teacher, CourseCategory, Course, Chapter, Student, StudentCourseEnrollment, CourseRating, \
    StudentFavoriteCourse, StudentAssignment, Notification
from .serializers import TeacherSerializer, CourseCategorySerializer, CourseListSerializer, CourseDetailSerializer, \
    ChapterSerializer, StudentSerializer, StudentCourseEnrollSerializer, CourseRatingSerializer, \
    StudentFavoriteCourseSerializer, StudentAssignmentSerializer, NotificationSerializer


class TeacherListCreate(ListCreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [permissions.IsAuthenticated]


class TeacherDetail(RetrieveUpdateDestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [permissions.IsAuthenticated]


@csrf_exempt
def teacher_login(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    try:
        teacherData = Teacher.objects.get(email=email, password=password)
        return JsonResponse({'bool': True, "teacher_id": teacherData.id})
    except Teacher.DoesNotExist:
        return JsonResponse({'bool': False})


class CategoryListCreate(ListCreateAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer
    permission_classes = [permissions.IsAuthenticated]


class CourseListCreate(ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx["request"] = self.request
        return ctx

    def get_queryset(self):
        qs = super().get_queryset()
        # limit ?result
        if "result" in self.request.GET:
            return qs.order_by("id")[:4]
        # ?category=term -> search in technologies
        category = self.request.GET.get("category")
        if category:
            qs = qs.filter(technologies__icontains=category)
        # ?skill_name=...&teacher=ID (search by tech token + teacher)
        skill_name = self.request.GET.get("skill_name")
        teacher_id = self.request.GET.get("teacher")
        if skill_name and teacher_id:
            qs = qs.filter(technologies__icontains=skill_name, teacher_id=teacher_id)
        if "studentId" in self.kwargs:
            studentId = self.kwargs["studentId"]
            student = Student.objects.get(id=studentId)

            # Split categories into a list
            categories = [c.strip() for c in student.interested_categories.split(",") if c.strip()]

            if categories:
                queries = [Q(technologies__icontains=value) for value in categories]
                query = queries.pop()
                for item in queries:
                    query |= item
                qs = Course.objects.filter(query)
            else:
                qs = Course.objects.none()

        return qs


class TeacherCourseList(ListCreateAPIView):
    serializer_class = CourseListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx["request"] = self.request
        return ctx

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        return Course.objects.filter(teacher_id=teacher_id)


class TeacherCourseDetail(RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx["request"] = self.request
        return ctx


class ChapterListCreate(ListCreateAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated]


class CourseChapterList(ListCreateAPIView):
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        return Chapter.objects.filter(course_id=course_id)


class TeacherChapterDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated]


class StudentListCreate(ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticated]

class StudentDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticated]


@csrf_exempt
def student_login(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    try:
        studentData = Student.objects.get(email=email, password=password)
        return JsonResponse({'bool': True, "student_id": studentData.id})
    except Student.DoesNotExist:
        return JsonResponse({'bool': False})


class StudentCourseEnrollmentCreateList(ListCreateAPIView):
    queryset = StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer


@csrf_exempt
def fetch_enroll_status(request, student_id, course_id):
    student = Student.objects.filter(id=student_id).first()
    course = Course.objects.filter(id=course_id).first()
    enrollStatus = StudentCourseEnrollment.objects.filter(student=student, course=course).count()
    if enrollStatus:
        return JsonResponse({"bool": True})
    else:
        return JsonResponse({"bool": False})


class FetchEnrolledStudents(ListCreateAPIView):
    queryset = StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if "course_id" in self.kwargs:
            course_id = self.kwargs['course_id']
            course = Course.objects.get(id=course_id)
            return StudentCourseEnrollment.objects.filter(course=course)
        elif "teacher_id" in self.kwargs:
            teacher_id = self.kwargs['teacher_id']
            course = Teacher.objects.get(id=teacher_id)
            return StudentCourseEnrollment.objects.filter(course__teacher=course).distinct()
        elif "student_id" in self.kwargs:
            student_id = self.kwargs['student_id']
            student = Student.objects.get(id=student_id)
            return StudentCourseEnrollment.objects.filter(student=student).distinct()
        return None


class CourseRatingListCreate(ListCreateAPIView):
    queryset = CourseRating.objects.all()
    serializer_class = CourseRatingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if "course_id" in self.kwargs:
            course_id = self.kwargs['course_id']
            course = Course.objects.get(id=course_id)
            return CourseRating.objects.filter(course=course)
        return CourseRating.objects.filter(course__isnull=False).order_by('-rating')

@csrf_exempt
def fetch_rating_status(request, student_id, course_id):
    student = Student.objects.filter(id=student_id).first()
    course = Course.objects.filter(id=course_id).first()
    rating_status = CourseRating.objects.filter(student=student, course=course).count()
    if rating_status:
        return JsonResponse({"bool": True})
    else:
        return JsonResponse({"bool": False})

class StudentFavoriteCourseListCreate(ListCreateAPIView):
    queryset = StudentFavoriteCourse.objects.all()
    serializer_class = StudentFavoriteCourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        student_id = request.data.get("student")
        course_id = request.data.get("course")

        favorite, created = StudentFavoriteCourse.objects.update_or_create(
            student_id=student_id,
            course_id=course_id,
            defaults={"status": request.data.get("status", True)},
        )
        serializer = self.get_serializer(favorite)
        return Response(serializer.data)

@csrf_exempt
def fetch_favorite_status(request, student_id, course_id):
    exists = StudentFavoriteCourse.objects.filter(
        student_id=student_id, course_id=course_id, status=True
    ).exists()
    return JsonResponse({"bool": exists})

@csrf_exempt
def remove_favorite_course(request, student_id, course_id):
    updated = StudentFavoriteCourse.objects.filter(
        student_id=student_id, course_id=course_id
    ).update(status=False)
    return JsonResponse({"bool": bool(updated)})

class StudentAssignmentListCreate(ListCreateAPIView):
    queryset = StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        student_id = self.kwargs['student_id']
        teacher_id = self.kwargs['teacher_id']
        student = Student.objects.get(id=student_id)
        teacher = Teacher.objects.get(id=teacher_id)
        return StudentAssignment.objects.filter(student=student, teacher=teacher)

class StudentShowAssignmentListCreate(ListCreateAPIView):
    queryset = StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        student_id = self.kwargs['student_id']
        student = Student.objects.get(id=student_id)
        return StudentAssignment.objects.filter(student=student)

class StudentUpdateAssignment(RetrieveUpdateDestroyAPIView):
    queryset = StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer


class NotificationListCreate(ListCreateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        student_id = self.kwargs.get("student_id")
        student = get_object_or_404(Student, id=student_id)

        return Notification.objects.filter(
            student=student,
            notification_for="student",
            notification_subject="assignment",
            notification_read_status=False
        )
