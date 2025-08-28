from rest_framework import serializers
from main.models import Teacher, Chapter, CourseCategory, Course


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


class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = [
            "id",
            "title",
            "description"
        ]


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            "id",
            "category",
            "teacher",
            "title",
            "description",
            "featured_image",
            "technologies"
        ]

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = [
            "id",
            "course",
            "title",
            "description",
            "video",
            "remarks",
        ]
