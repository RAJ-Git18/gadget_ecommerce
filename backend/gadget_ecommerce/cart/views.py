from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CartSerializer
from .models import CartModel


class CartView(APIView):
    def post(self, request):
        serializer = CartSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        userid = kwargs.get("userid")
        carts = CartModel.objects.filter(userid=userid)
        if carts is not None:
            serializer = CartSerializer(carts, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        cartid = kwargs.get("cartid")
        cart = CartModel.objects.filter(cartid=cartid).first()
        print(cart)
        if cart:
            cart.delete()
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_404_NOT_FOUND)


        data = request.data
        print(data)
        deserializer = CartUpdateSerializer(data=data)
        if deserializer.is_valid():
            deserializer.save()
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_404_NOT_FOUND)
