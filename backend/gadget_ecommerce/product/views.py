from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ProductSerializer
from .models import ProductModel
from rest_framework import status


import os
from django.conf import settings

# Create your views here.
class ProductView(APIView):
    def post(self, request):
        deserializer = ProductSerializer(data=request.data)
        if deserializer.is_valid():
            deserializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(deserializer.errors)

    def get(self, request):
        queryset = ProductModel.objects.all()
        serializer = ProductSerializer(queryset, many=True)
        return Response({"message": serializer.data}, status=status.HTTP_200_OK)
    

    def delete(self, request,*args, **kwargs):
        productid = kwargs.get('productid')
        queryset = ProductModel.objects.filter(productid = productid).first()
        if queryset is not None:
            print(queryset.image)
            queryset.delete()
            image_path = os.path.join(settings.MEDIA_ROOT, str(queryset.image))

            if os.path.exists(image_path):
                os.remove(image_path)
        
            return Response(status=status.HTTP_200_OK)
        
        return Response(status=status.HTTP_404_NOT_FOUND)
