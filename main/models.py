from django.db import models
from django.core import serializers
from django.db.models import Q


# teacher Model
class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    bio = models.TextField(max_length=100, null=True, blank=True)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    skills = models.TextField()

    class Meta:
        verbose_name_plural = "1. Teachers"

    def __str__(self):
        return self.full_name

    def skill_list(self):
        skill_list = self.skills.split(",")
        return skill_list


# Course category field
class CourseCategory(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

    class Meta:
        verbose_name_plural = "2. Course Categories"

    def __str__(self):
        return self.title


# Course
class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name="teacher_courses")
    title = models.CharField(max_length=100)
    description = models.TextField()
    featured_image = models.ImageField(upload_to="course_imgs/", null=True)
    technologies = models.TextField(null=True)

    class Meta:
        verbose_name_plural = "3. Courses"

    def related_videos(self):
        if not self.technologies:
            return serializers.serialize('json', Course.objects.none())

        # Split technologies string into individual words
        keywords = self.technologies.split()  # e.g. "django rest" → ["django", "rest"]

        # Build OR query for all keywords
        query = Q()
        for word in keywords:
            query |= Q(technologies__icontains=word)

        # Fetch related courses excluding the current one
        related_videos = Course.objects.filter(query).exclude(id=self.id).distinct()

        return serializers.serialize('json', related_videos)

    def tech_list(self):
        tech_list = self.technologies.split(",")
        return tech_list

    def course_rating(self):
        result = CourseRating.objects.filter(course=self).aggregate(avg_rating=models.Avg('rating'))
        return result["avg_rating"]

    def __str__(self):
        return self.title

    def total_enrolled_students(self):
        total_enrolled_students = StudentCourseEnrollment.objects.filter(course=self).count()
        return total_enrolled_students

#Chapter
class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="course_chapters", null=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    video = models.FileField(upload_to="chapter_videos/", null=True)
    remarks = models.TextField(null=True)

    class Meta:
        verbose_name_plural = "4. Chapters"

    def __str__(self):
        return self.title

# Student
class Student(models.Model):
    full_name = models.CharField(max_length=100)
    user_name = models.CharField(max_length=100, null=True)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    interested_categories = models.TextField()

    class Meta:
        verbose_name_plural = "5. Students"

    def __str__(self):
        return self.full_name

#student course enrollment
class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="enrolled_courses")
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="enrolled_student")
    enrolled_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "6. Student Course Enrollment"

    def __str__(self):
        return f"{self.course.title}-{self.student.full_name}"

class CourseRating(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    rating = models.PositiveBigIntegerField(null=True)
    review = models.TextField(null=True)
    review_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "7. Course Rating"

    def __str__(self):
        return f"{self.course.title}-{self.student.full_name} {str(self.rating)}"
