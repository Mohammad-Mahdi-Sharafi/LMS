from django.db.models import Q
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import permissions
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import (
    Teacher,
    CourseCategory,
    Course,
    Chapter,
    Student,
    StudentCourseEnrollment,
    CourseRating
)
from .serializers import (
    TeacherSerializer,
    CourseCategorySerializer,
    CourseListSerializer,
    CourseDetailSerializer,
    ChapterSerializer,
    StudentSerializer,
    StudentCourseEnrollSerializer, CourseRatingSerializer,
)


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
        course_id = self.kwargs['course_id']
        course = Course.objects.get(id=course_id)
        return CourseRating.objects.filter(course=course)


@csrf_exempt
def fetch_rating_status(request, student_id, course_id):
    student = Student.objects.filter(id=student_id).first()
    course = Course.objects.filter(id=course_id).first()
    rating_status = CourseRating.objects.filter(student=student, course=course).count()
    if rating_status:
        return JsonResponse({"bool": True})
    else:
        return JsonResponse({"bool": False})
