from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

User = get_user_model()


class EmailAuthentication(ModelBackend):
    def authenticate(self, request, email=None, password=None):
        if email is None or password is None:
            return None

        try:
            user = User.objects.filter(email=email).first()
            if user is not None and user.check_password(password):
                return user
        except User.DoesNotExist:
            return None
