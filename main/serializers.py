from rest_framework import serializers
from django.db.models import Q
from main.models import Teacher, Chapter, CourseCategory, Course, Student, StudentCourseEnrollment, CourseRating, \
    StudentFavoriteCourse, StudentAssignment, Notification


def absolute_media_url(request, field):
    """Return absolute URL for File/Image fields, or None if empty."""
    if not field:
        return None
    try:
        url = field.url
    except Exception:
        # already a string or None
        return field
    if request is not None:
        return request.build_absolute_uri(url)
    return url


class TeacherSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = [
            "id",
            "full_name"
        ]


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
            "profile_image",
            "skills",
        ]


class ChapterSerializer(serializers.ModelSerializer):
    video = serializers.FileField()

    class Meta:
        model = Chapter
        fields = [
            "id",
            "course",
            "title",
            "description",
            "video",
            "remarks"
        ]

    def get_video(self, obj):
        request = self.context.get("request")
        return absolute_media_url(request, obj.video)


class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = [
            "id",
            "title",
            "description"
        ]


class CourseListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for lists and teacher course list pages."""
    teacher = serializers.PrimaryKeyRelatedField(
        queryset=Teacher.objects.all()
    )
    featured_image = serializers.ImageField()

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
        ]

    def get_featured_image(self, obj):
        request = self.context.get("request")
        return absolute_media_url(request, obj.featured_image)


class CourseDetailSerializer(serializers.ModelSerializer):
    """Full serializer used on course detail endpoint (contains chapters, tech_list and related courses)."""
    teacher = TeacherSummarySerializer(read_only=True)
    course_chapters = ChapterSerializer(many=True, read_only=True)
    featured_image = serializers.ImageField()
    tech_list = serializers.SerializerMethodField()
    related_courses = serializers.SerializerMethodField()
    total_enrolled_students = serializers.SerializerMethodField()
    course_rating = serializers.SerializerMethodField()

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
            "tech_list",
            "course_chapters",
            "related_courses",
            "total_enrolled_students",
            "course_rating"
        ]

    def get_featured_image(self, obj):
        request = self.context.get("request")
        return absolute_media_url(request, obj.featured_image)

    def get_tech_list(self, obj):
        if not obj.technologies:
            return []
        raw = obj.technologies.replace("،", ",")  # handle Persian comma
        parts = []
        for chunk in raw.split(","):
            parts.extend(chunk.split())
        return [p.strip() for p in parts if p.strip()]

    def get_related_courses(self, obj):
        if not obj.technologies:
            return []
        tokens = self.get_tech_list(obj)
        q = Q()
        for t in tokens:
            q |= Q(technologies__icontains=t)
        qs = Course.objects.filter(q).exclude(id=obj.id).distinct().order_by("id")[:8]
        request = self.context.get("request")
        return [
            {
                "id": c.id,
                "title": c.title,
                "featured_image": absolute_media_url(request, c.featured_image),
            }
            for c in qs
        ]

    def get_total_enrolled_students(self, obj):
        return obj.total_enrolled_students()

    def get_course_rating(self, obj):
        return obj.course_rating()


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            "id",
            "full_name",
            "bio",
            "email",
            "user_name",
            "password",
            "profile_image",
            "interested_categories",
            "phone_number"
        ]

class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCourseEnrollment
        fields = [
            "id",
            "course",
            "student",
            "enrolled_time"
        ]
        depth = 2

class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseRating
        fields = [
            "id",
            "course",
            "student",
            "rating",
            "review",
            "review_time"
        ]

    def __init__(self, *args, **kwargs):
        super(CourseRatingSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")

        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 1


class StudentFavoriteCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentFavoriteCourse
        fields = [
            "id",
            "course",
            "student",
            "status",
        ]
    def __init__(self, *args, **kwargs):
        super(StudentFavoriteCourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 2

# Student assignment serializer
class StudentAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAssignment
        fields = [
            "id",
            "teacher",
            "student",
            "title",
            "detail",
            "status",
            "add_time",
        ]
    def __init__(self, *args, **kwargs):
        super(StudentAssignmentSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 2

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = [
            "id",
            "teacher",
            "student",
            "notification_subject",
            "notification_for",
            "notification_created_time",
            "notification_read_status",
        ]
