from rest_framework import serializers
from .models import Profile, Project, Skill, ContactSubmission, AboutMe

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'name', 'title', 'email', 'phone', 'telegram', 'github']

class AboutMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutMe
        fields = ['id', 'content', 'email', 'phone_number', 'telegram', 'yearly_experience', 'projects_completed', 'client_satisfaction', 'technologies', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'project_type', 'image_url', 'bot_username', 'tech_stack', 'github_url', 'live_url', 'created_at']

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'category', 'name', 'level']

class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['id', 'email', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']