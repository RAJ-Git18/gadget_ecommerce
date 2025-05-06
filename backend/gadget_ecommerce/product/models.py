from django.db import models
import uuid


# Create your models here.
class ProductModel(models.Model):
    productid = models.UUIDField(editable=False, primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to="images/")
    price = models.PositiveIntegerField()
    stock = models.PositiveIntegerField()
    displayas = models.CharField(max_length=100, null=True)
    category = models.CharField(max_length=100)
    description = models.TextField()

