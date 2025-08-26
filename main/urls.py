from django.urls import path
from . import views

urlpatterns = [
    path(route="teacher", view=views.TeacherListCreate.as_view(), name="teacher"),
    path(route="teacher/<int:pk>", view=views.TeacherDetail.as_view(), name="teacher-detail"),
]

