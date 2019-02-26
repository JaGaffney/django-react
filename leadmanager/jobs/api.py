# NOTE
# disabled just so I can remeber the other way of creating APIs
# END NOTE

# from jobs.models import Jobs
# from rest_framework import viewsets, permissions
# from .serializers import JobsSerializer

# # Job Viewset only shows single users jobs
# class JobsViewSet(viewsets.ModelViewSet):
#     permission_classes = [
#         permissions.IsAuthenticated,
#     ]
#     serializer_class = JobsSerializer

#     def get_queryset(self):
#         return self.request.user.jobs.all()

#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)

# # shows all jobs for all users if authenticated
# class JobsViewSetAll(viewsets.ModelViewSet):
#     permission_classes = [
#         permissions.IsAuthenticated,
#     ]

#     serializer_class = JobsSerializer

#     queryset = Jobs.objects.all()