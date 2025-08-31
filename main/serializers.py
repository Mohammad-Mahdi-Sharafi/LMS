from rest_framework import serializers
from main.models import Teacher, Chapter, CourseCategory, Course


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = [
            "id",
            "full_name",
            "bio",
            "email",
            "password",
            "qualification",
            "phone_number",
            "teacher_courses"
        ]
        depth = 1


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
            "technologies",
            "course_chapters",
            "related_videos",
            "tech_list"

        ]
        depth = 1

    def get_related_courses(self, obj):
        return [
            {
                "id": course.id,
                "title": course.title,
                "featured_image": course.featured_image.url if course.featured_image else None
            }
            for course in obj.related_courses.all()
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
