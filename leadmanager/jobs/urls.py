from django.urls import path, include

from jobs import views

urlpatterns = [
    path('api/jobs/', views.JobsList.as_view()),
    path('api/jobs/<int:pk>/', views.JobsDetail.as_view()),
    path('api/alljobs/', views.JobsViewSetAll.as_view()),
]

