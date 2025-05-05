from .models import OrderModel, OrderItemModel
from rest_framework import serializers
from product.serializers import ProductSerializer


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderModel
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    order = OrderSerializer(source="orderid", read_only=True)
    product = ProductSerializer(source="productid", read_only=True)

    # Access the phone number from the nested order's userid
    phonenumber = serializers.CharField(
        source="orderid.userid.phonenumber", read_only=True
    )

    class Meta:
        model = OrderItemModel
        fields = [
            "productid",
            "quantity",
            "price",
            "orderid",
            "order",
            "product",
            "phonenumber",
        ]
