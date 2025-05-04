from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import OrderSerializer, OrderItemSerializer
from .models import OrderItemModel
from rest_framework.permissions import IsAuthenticated


class OrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            userid = request.data.get("userid")
            totalamount = request.data.get("totalamount")

            if userid is None:
                return Response(status=status.HTTP_400_BAD_REQUEST)

            orderdata = {"userid": userid, "totalamount": totalamount}

            orderserializer = OrderSerializer(data=orderdata)
            if orderserializer.is_valid():
                order = orderserializer.save()

                items = request.data.get("items")
                order_items = []  # Store created items
                for item in items:
                    orderitemdata = {
                        "orderid": order.orderid,
                        "productid": item["productid"],
                        "quantity": item["quantity"],
                        "price": item["price"],
                    }
                    print(orderitemdata)

                    orderitemserializer = OrderItemSerializer(data=orderitemdata)
                    if orderitemserializer.is_valid():
                        orderitemserializer.save()
                        order_items.append(orderitemserializer.data)
                    else:
                        order.delete()
                        return Response(
                            {
                                "error": "Invalid item data",
                                "details": orderitemserializer.errors,
                            },
                            status=status.HTTP_400_BAD_REQUEST,
                        )

                return Response(
                    {
                        "order": orderserializer.data,
                        "items": order_items,
                        "message": "Order created successfully",
                    },
                    status=status.HTTP_201_CREATED,
                )
            return Response(orderserializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class OrderItemView(APIView):
    def get(self, request):
        try:
            queryset = OrderItemModel.objects.all()
            deserializer = OrderItemSerializer(queryset, many=True)
            return Response({"message": deserializer.data}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
