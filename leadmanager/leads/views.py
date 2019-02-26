from rest_framework import generics, permissions

from .models import Lead
from .serializers import LeadSerializer

# code was moved from API.py file as views will only be used for API releated actions so no reason to not just have everything in views
# creates an api list of all user Lead as well as allowing for creation of a new Lead under the users name
class LeadList(generics.ListCreateAPIView):
    serializer_class = LeadSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    # this is what sets the queryset to only Leads created by the logged in user
    def get_queryset(self):
        print(self.request.user)
        return self.request.user.leads.all()

# allows for POST, PUT and DELETE requests to the api of the user is Authenticated
class LeadDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

# displays a list of all Jobs no matter which user made it, may be a better a way to display this infomration?
class LeadViewSetAll(generics.ListAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]