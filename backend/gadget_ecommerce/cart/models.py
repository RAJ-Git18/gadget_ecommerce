# Create your models here.
from django.db import models
import uuid
from product.models import ProductModel
from accounts.models import CustomUserModel


# Create your models here.
class CartModel(models.Model):
    cartid = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    userid = models.ForeignKey(CustomUserModel, on_delete=models.CASCADE)
    productid = models.ForeignKey(ProductModel, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
