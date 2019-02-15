from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI, UserListAPI
from knox import views as knox_views

# users list details
from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import UserSerializer

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/auth/userlist', UserListAPI.as_view(queryset=User.objects.all(), serializer_class=UserSerializer), name='user-list')
]