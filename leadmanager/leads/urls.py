from django.urls import path, include

from leads import views

urlpatterns = [
    path('api/leads/', views.LeadList.as_view()),
    path('api/leads/<int:pk>/', views.LeadDetail.as_view()),
    path('api/allleads/', views.LeadViewSetAll.as_view()),
]

