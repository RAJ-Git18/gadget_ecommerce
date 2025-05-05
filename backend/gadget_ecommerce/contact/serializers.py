from .models import ContactModel
from rest_framework import serializers


class ContactSerializers(serializers.ModelSerializer):
    class Meta:
        model = ContactModel
        fields = "__all__"
