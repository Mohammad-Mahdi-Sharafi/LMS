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
    Skills = models.TextField()

    class Meta:
        verbose_name_plural = "1. Teachers"

    def __str__(self):
        return self.full_name


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

    def __str__(self):
        return self.title

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
    email = models.EmailField()
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    address = models.TextField()
    interested_categories = models.TextField()

    class Meta:
        verbose_name_plural = "5. Students"



