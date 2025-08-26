from rest_framework import serializers
from main.models import Teacher, Student, CourseCategory, Course


class TeacherSerializer(serializers.ModelSerializer):

    class Meta:
        model = Teacher
        fields = [
            "id",
            "full_name",
            "email",
            "password",
            "qualification",
            "phone_number",
        ]

