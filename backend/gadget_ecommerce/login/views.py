from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.models import CustomUserModel
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from accounts.serializers import RegisterSerializer


class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(email=email, password=password)
        myuser = CustomUserModel.objects.filter(email=email).first()

        if user and myuser is not None:
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token
            return Response(
                {
                    "message": "Login successful",
                    "refresh": str(refresh),
                    "access": str(access),
                    "is_admin": user.is_superuser,
                    # "status": True,
                    "userid": user.pk,
                    "cartcount": myuser.cartcount,
                }
            )

        return Response({"message": "Login unsuccessful"})

    def patch(self, request):
        userid = request.data.get("userid")
        cartcount = request.data.get("cartcount")
        user = CustomUserModel.objects.filter(id=userid).first()
        print(cartcount)
        if user is not None:
            deserializer = RegisterSerializer(
                user, data={"cartcount": cartcount}, partial=True
            )
            if deserializer.is_valid():
                deserializer.save()
                return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_404_NOT_FOUND)


class ProtectedView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        admin = user.is_superuser
        print(admin)
        return Response({"message": admin})
