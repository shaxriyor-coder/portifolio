from django.contrib import admin
from django.db import models
from .models import Profile, Project, Skill, ContactSubmission, AboutMe

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'email']
    search_fields = ['name', 'email']
    verbose_name = "Profile"
    verbose_name_plural = "Profile"

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at']
    search_fields = ['title', 'tech_stack']
    list_filter = ['created_at']

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'level']
    search_fields = ['name', 'category']
    list_filter = ['category', 'level']

@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ['email', 'created_at']
    search_fields = ['email']
    list_filter = ['created_at']
    readonly_fields = ['created_at']

@admin.register(AboutMe)
class AboutMeAdmin(admin.ModelAdmin):
    list_display = ['get_short_content', 'yearly_experience', 'projects_completed', 'client_satisfaction', 'updated_at']
    search_fields = ['content', 'email', 'technologies']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('About Content', {
            'fields': ('content',),
            'classes': ('wide',)
        }),
        ('Contact Information', {
            'fields': ('email', 'phone_number', 'telegram'),
        }),
        ('Experience & Statistics', {
            'fields': ('yearly_experience', 'projects_completed', 'client_satisfaction'),
        }),
        ('Technologies', {
            'fields': ('technologies',),
            'classes': ('wide',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    formfield_overrides = {
        models.TextField: {'widget': admin.widgets.AdminTextareaWidget(attrs={'rows': 15, 'cols': 100})},
    }

    def get_short_content(self, obj):
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    get_short_content.short_description = "Content"
