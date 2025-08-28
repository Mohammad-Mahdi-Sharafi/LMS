from django.urls import path
from . import views

urlpatterns = [
    path(route="teacher", view=views.TeacherListCreate.as_view(), name="teacher"),
    path(route="teacher/<int:pk>", view=views.TeacherDetail.as_view(), name="teacher-detail"),
    path(route="teacher-login", view=views.teacher_login, name="teacher-login"),
    path(route="category", view=views.CategoryListCreate.as_view(), name="category"),
    path(route="course", view=views.CourseListCreate.as_view(), name="course"),
    path(route="teacher-courses/<int:teacher_id>", view=views.TeacherCourseList.as_view(), name="teacher-course-list"),
    path(route="chapter", view=views.ChapterListCreate.as_view(), name="chapter"),
]
