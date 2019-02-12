from django.db import models
from django.contrib.auth.models import User

class Jobs(models.Model):
    job_name = models.CharField(max_length=100, unique=True)
    job_type = models.CharField(max_length=100)
    client_business_name = models.CharField(max_length=100)
    client_contact_name = models.CharField(max_length=100)
    client_contact_email = models.EmailField(max_length=100)
    message = models.CharField(max_length=500, blank=True)
    owner = models.ForeignKey(User, related_name="jobs", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    start_date = models.DateTimeField(blank=True)
    end_date = models.DateTimeField(blank=True)
    cost = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.job_name