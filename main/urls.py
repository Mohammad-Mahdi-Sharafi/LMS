from django.urls import path
from . import views

urlpatterns = [
    path(route="teacher", view=views.TeacherListCreate.as_view(), name="teacher"),
    path(route="teacher/<int:pk>", view=views.TeacherDetail.as_view(), name="teacher-detail"),
    path(route="teacher-login", view=views.teacher_login, name="teacher-login"),
    path(route="category", view=views.CategoryListCreate.as_view(), name="category"),
    path(route="course", view=views.CourseListCreate.as_view(), name="course"),
    path(route="teacher-courses/<int:teacher_id>", view=views.TeacherCourseList.as_view(), name="teacher-course-list"),
    path(route="teacher-course-detail/<int:pk>", view=views.TeacherCourseDetail.as_view(), name="teacher-course-detail"),
    path(route="chapter", view=views.ChapterListCreate.as_view(), name="chapter"),
    path(route="course-chapters/<int:course_id>", view=views.CourseChapterList.as_view(), name="course-chapter-list"),
    path(route="chapter-detail/<int:pk>", view=views.TeacherChapterDetailView.as_view(), name="chapter-detail"),
    path(route="student", view=views.StudentListCreate.as_view(), name="student"),
    path(route="student-login", view=views.student_login, name="student-login"),
    path(route="student-enroll-course", view=views.StudentCourseEnrollmentCreateList.as_view(), name="student-enroll-course"),
    path(route="fetch-enroll-status/<int:student_id>/<int:course_id>", view=views.fetch_enroll_status, name="fetch-enroll-status"),
    path(route="fetch-enrolled-students/<int:course_id>", view=views.FetchEnrolledStudents.as_view(), name="fetch_enrolled_students"),
    path(route="course-rating/<int:course_id>", view=views.CourseRatingListCreate.as_view(), name="course-rating"),
    path(route="fetch-rating-status/<int:student_id>/<int:course_id>", view=views.fetch_rating_status, name="fetch_rating_students"),
]
