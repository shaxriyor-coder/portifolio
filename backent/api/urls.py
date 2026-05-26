from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import ProfileViewSet, ProjectViewSet, SkillViewSet, ContactSubmissionViewSet, AboutMeViewSet, login

router = DefaultRouter()
router.register(r'profile', ProfileViewSet, basename='profile')
router.register(r'projects', ProjectViewSet)
router.register(r'skills', SkillViewSet)
router.register(r'contact', ContactSubmissionViewSet)
router.register(r'about-me', AboutMeViewSet, basename='about-me')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/login/', login, name='login'),
]