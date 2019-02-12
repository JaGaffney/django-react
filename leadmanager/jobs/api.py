from jobs.models import Jobs
from rest_framework import viewsets, permissions
from .serializers import JobsSerializer

# Lead Viewset
class JobsViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = JobsSerializer

    def get_queryset(self):
        return self.request.user.jobs.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)