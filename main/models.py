from django.db import models


# teacher Model
class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    Skills = models.TextField()

    class Meta:
        verbose_name_plural = "1. Teachers"

# Course category field
class CourseCategory(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

    class Meta:
        verbose_name_plural = "2. Course Categories"

# Course
class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()

    class Meta:
        verbose_name_plural = "3. Courses"

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
        verbose_name_plural = "4. Students"
