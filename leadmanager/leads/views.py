from rest_framework import generics, permissions

from .models import Lead
from .serializers import LeadSerializer

class LeadList(generics.ListCreateAPIView):
    serializer_class = LeadSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        return self.request.user.leads.all()

class LeadDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]


class LeadViewSetAll(generics.ListAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]