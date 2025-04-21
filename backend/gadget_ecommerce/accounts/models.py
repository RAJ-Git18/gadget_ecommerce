from django.contrib.auth.models import AbstractUser
import uuid
from django.db import models

class CustomUserModel(AbstractUser):
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    def __str__(self):
        return self.username