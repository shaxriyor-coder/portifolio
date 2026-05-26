from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=100, verbose_name="Ism")
    title = models.CharField(max_length=100, verbose_name="Lavozim")
    email = models.EmailField(verbose_name="Email")
    phone = models.CharField(max_length=20, blank=True, verbose_name="Telefon")
    telegram = models.CharField(max_length=50, blank=True, verbose_name="Telegram")
    github = models.URLField(blank=True, verbose_name="GitHub")

    class Meta:
        db_table = 'profile'
        verbose_name = "Profil"
        verbose_name_plural = "Profil"

    def __str__(self):
        return self.name

class AboutMe(models.Model):
    content = models.TextField(verbose_name="Mazmun")
    email = models.EmailField(blank=True, verbose_name="Email")
    phone_number = models.CharField(max_length=20, blank=True, verbose_name="Telefon raqami")
    telegram = models.CharField(max_length=100, blank=True, verbose_name="Telegram")
    yearly_experience = models.IntegerField(default=0, verbose_name="Yillik tajriba")
    projects_completed = models.IntegerField(default=0, verbose_name="Tugallangan loyihalar")
    client_satisfaction = models.IntegerField(default=0, verbose_name="Mijozlar qanaqatligi (%)")
    technologies = models.TextField(blank=True, verbose_name="Texnologiyalar")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan vaqt")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Yangilangan vaqt")

    class Meta:
        db_table = 'about_me'
        verbose_name = "Men haqimda"
        verbose_name_plural = "Men haqimda"
        ordering = ['-updated_at']

    def __str__(self):
        return "Men haqimda"

class Project(models.Model):
    PROJECT_TYPES = [
        ('web', 'Veb loyihasi'),
        ('bot', 'Telegram bot'),
    ]

    title = models.CharField(max_length=200, verbose_name="Sarlavha")
    description = models.TextField(verbose_name="Tavsif")
    project_type = models.CharField(max_length=10, choices=PROJECT_TYPES, default='web', verbose_name="Loyiha turi")
    image_url = models.URLField(blank=True, verbose_name="Rasm URL")
    bot_username = models.CharField(max_length=100, blank=True, verbose_name="Bot username")
    tech_stack = models.CharField(max_length=500, verbose_name="Texnologiyalar")
    github_url = models.URLField(blank=True, verbose_name="GitHub URL")
    live_url = models.URLField(blank=True, verbose_name="Jonli URL")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan vaqt")

    class Meta:
        db_table = 'projects'
        ordering = ['-created_at']
        verbose_name = "Loyiha"
        verbose_name_plural = "Loyihalar"

    def __str__(self):
        return self.title

class Skill(models.Model):
    LEVEL_CHOICES = [
        ('beginner', 'Boshlang\'ich'),
        ('intermediate', 'O\'rta'),
        ('advanced', 'Yuqori'),
    ]

    category = models.CharField(max_length=50, verbose_name="Kategoriya")
    name = models.CharField(max_length=100, verbose_name="Nomi")
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='intermediate', verbose_name="Daraja")

    class Meta:
        db_table = 'skills'
        ordering = ['category', 'name']
        verbose_name = "Ko\'nikma"
        verbose_name_plural = "Ko\'nikmalar"

    def __str__(self):
        return f"{self.category} - {self.name}"

class ContactSubmission(models.Model):
    email = models.EmailField(verbose_name="Email")
    message = models.TextField(verbose_name="Xabar")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan vaqt")

    class Meta:
        db_table = 'contact_submissions'
        ordering = ['-created_at']
        verbose_name = "Aloqa xabari"
        verbose_name_plural = "Aloqa xabarlari"

    def __str__(self):
        return f" {self.email} dan xabar"
