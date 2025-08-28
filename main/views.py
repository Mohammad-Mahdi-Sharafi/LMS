from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
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
    teacherData = Teacher.objects.get(email=email, password=password)
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

# specific teacher course
class TeacherCourseList(ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = Teacher.objects.get(id=teacher_id)
        return Course.objects.filter(teacher=teacher)

class ChapterListCreate(ListCreateAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated]

