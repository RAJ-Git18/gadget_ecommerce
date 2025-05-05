from django.db import models
import uuid
from django.utils import timezone

# Create your models here.
class ContactModel(models.Model):
    contactid = models.UUIDField(editable=False, primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=50)
    email = models.EmailField( max_length=254)
    message = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
