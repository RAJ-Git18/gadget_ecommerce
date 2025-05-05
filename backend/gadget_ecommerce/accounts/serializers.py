from .models import CustomUserModel
from rest_framework import serializers


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUserModel
        fields = ["id", "username", "first_name", "last_name", "email", "password", "cartcount","phonenumber"]

        def validate(self, data):
            db_username = CustomUserModel.objects.filter(username=data["username"]).exists()
            db_email = CustomUserModel.objects.filter(email=data["email"]).exists()
            if (db_username):
                raise serializers.ValidationError({"username":"Username already exists"})
            if (db_email):
                raise serializers.ValidationError({"email":"Email already exists"})
            

            return data