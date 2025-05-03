from rest_framework import serializers
from .models import CartModel
from product.models import ProductModel
from product.serializers import ProductSerializer


class CartSerializer(serializers.ModelSerializer):

    # to extend the product model in the cart model
    product = ProductSerializer(source="productid", read_only=True)

    class Meta:
        model = CartModel
        fields = ["userid", "productid", "quantity", "cartid", "product"]
        read_only_fields = ["cartid", "product"]

    def create(self, validated_data):
        cart = CartModel.objects.filter(
            userid=validated_data["userid"], productid=validated_data["productid"]
        ).first()

        if cart:
            cart.quantity += 1
            cart.save()
            return cart

        return CartModel.objects.create(**validated_data)
    


