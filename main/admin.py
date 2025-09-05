from django.contrib import admin
from . import models

admin.site.register(models.Teacher)
admin.site.register(models.Student)
admin.site.register(models.Course)
admin.site.register(models.Chapter)
admin.site.register(models.CourseCategory)
admin.site.register(models.StudentCourseEnrollment)
admin.site.register(models.CourseRating)
admin.site.register(models.StudentAssignment)

class NotificationAdmin(admin.ModelAdmin):
    list_display = ["id", "notification_subject", "notification_for", "notification_read_status"]

admin.site.register(models.Notification)
