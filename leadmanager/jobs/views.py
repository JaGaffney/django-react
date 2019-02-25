from rest_framework import generics, permissions, viewsets

from .models import Jobs
from .serializers import JobsSerializer

class JobsList(generics.ListCreateAPIView):
    serializer_class = JobsSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        return self.request.user.jobs.all()

class JobsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Jobs.objects.all()
    serializer_class = JobsSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]


class JobsViewSetAll(generics.ListAPIView):
    queryset = Jobs.objects.all()
    serializer_class = JobsSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    

    