from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


User = get_user_model()


class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(email=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token
            return Response(
                {
                    "message": "Login successful",
                    "refresh": str(refresh),
                    "access": str(access),
                    "is_admin": user.is_superuser,
                    "status": "Logged In",
                }
            )

        return Response({"message": "Login unsuccessful"})


class ProtectedView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        admin = user.is_superuser
        return Response({"message": admin})
