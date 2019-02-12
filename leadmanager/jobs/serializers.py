from rest_framework import serializers
from jobs.models import Jobs

# lead serizalier

class JobsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jobs
        fields = '__all__'