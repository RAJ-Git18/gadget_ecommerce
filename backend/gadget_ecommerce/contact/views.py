from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ContactModel
from .serializers import ContactSerializers


# Create your views here.
class ContactView(APIView):
    def post(self, request):
        deserializers = ContactSerializers(data=request.data)
        if deserializers.is_valid():
            deserializers.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request):
        queryset = ContactModel.objects.all()
        if queryset is not None:
            serializers = ContactSerializers(queryset, many=True)
            return Response({"message": serializers.data}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        contactid = kwargs.get("contactid")
        queryset = ContactModel.objects.filter(contactid=contactid).first()
        if queryset is not None:
            queryset.delete()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)
