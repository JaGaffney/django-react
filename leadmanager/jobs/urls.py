from rest_framework import routers
from .api import JobsViewSet, JobsViewSetAll

router = routers.DefaultRouter()
router.register('api/jobs', JobsViewSet, 'jobs')
router.register('api/alljobs', JobsViewSetAll, 'jobs')

urlpatterns = router.urls