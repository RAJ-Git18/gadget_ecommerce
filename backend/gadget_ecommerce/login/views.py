from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email = email, password = password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token
            return Response({
                'message' : 'Login successful',
                'refresh': str(refresh),
                'access': str(access),
                'isadmin': user.is_superuser
            })

        return Response({
            'message' : 'Login unsuccessful',
            
        })
