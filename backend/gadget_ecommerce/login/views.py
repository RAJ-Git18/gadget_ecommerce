from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

User = get_user_model()

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email = email, password = password)

        my_user = User.objects.filter(email = email).first()
        if my_user:
            print(my_user.pk)
            # f1223fbb-0772-4ba2-a21c-61cde68a7070

        if user is not None:
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token
            return Response({
                'message' : 'Login successful',
                # 'user_id' : user.
                'refresh': str(refresh),
                'access': str(access),
                'is_admin': user.is_superuser
            })

        return Response({
            'message' : 'Login unsuccessful',
            
        })
