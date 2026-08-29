from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=100, verbose_name="Name")
    title = models.CharField(max_length=100, verbose_name="Title")
    email = models.EmailField(verbose_name="Email")
    phone = models.CharField(max_length=20, blank=True, verbose_name="Phone")
    telegram = models.CharField(max_length=50, blank=True, verbose_name="Telegram")
    github = models.URLField(blank=True, verbose_name="GitHub")

    class Meta:
        db_table = 'profile'
        verbose_name = "Profile"
        verbose_name_plural = "Profile"

    def __str__(self):
        return self.name

class AboutMe(models.Model):
    content = models.TextField(verbose_name="Content")
    email = models.EmailField(blank=True, verbose_name="Email")
    phone_number = models.CharField(max_length=20, blank=True, verbose_name="Phone number")
    telegram = models.CharField(max_length=100, blank=True, verbose_name="Telegram")
    yearly_experience = models.IntegerField(default=0, verbose_name="Years of experience")
    projects_completed = models.IntegerField(default=0, verbose_name="Projects completed")
    client_satisfaction = models.IntegerField(default=0, verbose_name="Client satisfaction (%)")
    technologies = models.TextField(blank=True, verbose_name="Technologies")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created at")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated at")

    class Meta:
        db_table = 'about_me'
        verbose_name = "About Me"
        verbose_name_plural = "About Me"
        ordering = ['-updated_at']

    def __str__(self):
        return "About Me"

class Project(models.Model):
    PROJECT_TYPES = [
        ('web', 'Web project'),
        ('bot', 'Telegram bot'),
        ('mobile', 'Mobile app'),
    ]

    title = models.CharField(max_length=200, verbose_name="Title")
    description = models.TextField(verbose_name="Description")
    project_type = models.CharField(max_length=10, choices=PROJECT_TYPES, default='web', verbose_name="Project type")
    image_url = models.URLField(blank=True, verbose_name="Image URL")
    bot_username = models.CharField(max_length=100, blank=True, verbose_name="Bot username")
    tech_stack = models.CharField(max_length=500, verbose_name="Tech stack")
    github_url = models.URLField(blank=True, verbose_name="GitHub URL")
    live_url = models.URLField(blank=True, verbose_name="Live URL")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created at")

    class Meta:
        db_table = 'projects'
        ordering = ['-created_at']
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self):
        return self.title

class Skill(models.Model):
    LEVEL_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]

    category = models.CharField(max_length=50, verbose_name="Category")
    name = models.CharField(max_length=100, verbose_name="Name")
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='intermediate', verbose_name="Level")

    class Meta:
        db_table = 'skills'
        ordering = ['category', 'name']
        verbose_name = "Skill"
        verbose_name_plural = "Skills"

    def __str__(self):
        return f"{self.category} - {self.name}"

class ContactSubmission(models.Model):
    email = models.EmailField(verbose_name="Email")
    message = models.TextField(verbose_name="Message")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created at")

    class Meta:
        db_table = 'contact_submissions'
        ordering = ['-created_at']
        verbose_name = "Contact submission"
        verbose_name_plural = "Contact submissions"

    def __str__(self):
        return f"Message from {self.email}"
