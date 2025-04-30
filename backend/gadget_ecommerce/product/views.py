from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ProductSerializer

# Create your views here.
class ProductView(APIView):
    def post(self, request):
        pass