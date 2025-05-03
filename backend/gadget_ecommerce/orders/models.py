from django.db import models
import uuid
from product.models import ProductModel
from accounts.models import CustomUserModel


# Create your models here.
class OrderModel(models.Model):
    orderid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    userid = models.ForeignKey(CustomUserModel, on_delete=models.CASCADE)
    totalamount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=100, default="Pending")


class OrderItemModel(models.Model):
    orderitemid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    orderid = models.ForeignKey(OrderModel, on_delete=models.CASCADE)
    productid = models.ForeignKey(ProductModel, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
