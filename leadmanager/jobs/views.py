from rest_framework import generics, permissions

from .models import Jobs
from .serializers import JobsSerializer

# code was moved from API.py file as views will only be used for API releated actions so no reason to not just have everything in views
# creates an api list of all user Jobs as well as allowing for creation of a new Job under the users name
class JobsList(generics.ListCreateAPIView):
    serializer_class = JobsSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    # this is what sets the queryset to only Jobs created by the logged in user
    def get_queryset(self):
        return self.request.user.jobs.all()

# allows for POST, PUT and DELETE requests to the api of the user is Authenticated
class JobsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Jobs.objects.all()
    serializer_class = JobsSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

# displays a list of all Jobs no matter which user made it, may be a better a way to display this infomration?
class JobsViewSetAll(generics.ListAPIView):
    queryset = Jobs.objects.all()
    serializer_class = JobsSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]