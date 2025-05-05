from django.contrib.auth.models import AbstractUser
import uuid
from django.db import models
from django.core.validators import RegexValidator


nepali_phone_validator = RegexValidator(
    regex=r"^(97|98)\d{8}$",
    message="Enter a valid 10-digit Nepali phone number starting with 97 or 98.",
)


class CustomUserModel(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cartcount = models.PositiveIntegerField(default=0)
    phonenumber = models.CharField(
        max_length=10,
        validators=[nepali_phone_validator],
        unique=True,
        blank=False,
        null=True
    )

    def __str__(self):
        return self.username
