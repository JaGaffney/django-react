from rest_framework import routers
from .api import JobsViewSet

router = routers.DefaultRouter()
router.register('api/jobs', JobsViewSet, 'jobs')

urlpatterns = router.urls