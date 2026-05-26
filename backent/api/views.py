from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Profile, Project, Skill, ContactSubmission, AboutMe
from .serializers import (
    ProfileSerializer,
    ProjectSerializer,
    SkillSerializer,
    ContactSubmissionSerializer,
    AboutMeSerializer
)

class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        # Always return only one profile (first one or create if none exists)
        profile = Profile.objects.first()
        if not profile:
            profile = Profile.objects.create(
                name='Portfolio Owner',
                title='Developer',
                email='admin@example.com',
                phone='',
                telegram='',
                github=''
            )
        return Profile.objects.filter(id=profile.id)

    def list(self, request):
        profile = self.get_queryset().first()
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        profile = self.get_queryset().first()
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    def update(self, request, pk=None):
        profile = self.get_queryset().first()
        serializer = self.get_serializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        profile = self.get_queryset().first()
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class ContactSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer

    def get_permissions(self):
        if self.action == 'create':
            return []  # Allow anyone to create contact submissions
        return super().get_permissions()

class AboutMeViewSet(viewsets.ModelViewSet):
    serializer_class = AboutMeSerializer

    def get_queryset(self):
        # Always return only one about me (first one or create if none exists)
        about_me = AboutMe.objects.first()
        if not about_me:
            about_me = AboutMe.objects.create(content='')
        return AboutMe.objects.filter(id=about_me.id)

    def list(self, request):
        about_me = self.get_queryset().first()
        serializer = self.get_serializer(about_me)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        about_me = self.get_queryset().first()
        serializer = self.get_serializer(about_me)
        return Response(serializer.data)

    def update(self, request, pk=None):
        about_me = self.get_queryset().first()
        serializer = self.get_serializer(about_me, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        about_me = self.get_queryset().first()
        serializer = self.get_serializer(about_me, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not email or not password:
        return Response(
            {'error': 'Email va parol talab qilinadi'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {'error': 'Email yoki parol noto\'g\'ri'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    if not user.check_password(password):
        return Response(
            {'error': 'Email yoki parol noto\'g\'ri'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    if not user.is_staff or not user.is_superuser:
        return Response(
            {'error': 'Admin huquqlari kerak'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    return Response({
        'success': True,
        'message': 'Muvaffaqiyat bilan kirish',
        'user': {
            'id': user.id,
            'email': user.email,
            'username': user.username
        }
    }, status=status.HTTP_200_OK)

