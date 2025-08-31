from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import permissions
from .models import Teacher, CourseCategory, Course, Chapter
from .serializers import TeacherSerializer, CourseCategorySerializer, CourseSerializer, ChapterSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


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
    email = request.POST['email']
    password = request.POST['password']
    try:
        teacherData = Teacher.objects.get(email=email, password=password)
    except Teacher.DoesNotExist:
        teacherData = None
    if teacherData:
        return JsonResponse({'bool': True, "teacher_id": teacherData.id})
    else:
        return JsonResponse({'bool': False})


class CategoryListCreate(ListCreateAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer
    permission_classes = [permissions.IsAuthenticated]


class CourseListCreate(ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset()
        if "result" in self.request.GET:
            qs = Course.objects.all().order_by("id")[:4]
        if "category" in self.request.GET:
            category = self.request.GET["category"]
            qs = Course.objects.filter(technologies__icontains=category)
        if "skill_name" and "teacher" in self.request.GET:
            skill_name = self.request.GET["skill_name"]
            skill_name = self.request.GET["teacher"]
            teacher = Teacher.objects.filter(id=skill_name).first()
            qs = Course.objects.filter(skills__icontains=skill_name, teacher=teacher)
        return qs

# specific teacher course
class TeacherCourseList(ListCreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = Teacher.objects.get(id=teacher_id)
        return Course.objects.filter(teacher=teacher)

class TeacherCourseDetail(RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class ChapterListCreate(ListCreateAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated]


class CourseChapterList(ListCreateAPIView):
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = Course.objects.get(pk=course_id)
        return Chapter.objects.filter(course=course)

class TeacherChapterDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated]


