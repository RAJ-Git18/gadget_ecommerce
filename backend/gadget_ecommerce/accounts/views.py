from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CustomUserModel
from .serializers import RegisterSerializer


class RegisterView(APIView):
    def get(self, request):
        queryset = CustomUserModel.objects.all()
        serializer = RegisterSerializer(queryset, many= True)
        return Response({"user_details": serializer.data})

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            CustomUserModel.objects.create_user(
                username=request.data.get("username"),
                first_name=request.data.get("firstname"),
                last_name=request.data.get("lastname"),
                email=request.data.get("email"),
                phonenumber=request.data.get("phonenumber"),
                password=request.data.get("password"),
            )

            return Response({"message": "Register successfull"})

        return Response(serializer.errors)
