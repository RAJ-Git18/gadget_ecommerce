from django.urls import path
from login.views import LoginView, ProtectedView
from accounts.views import RegisterView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("protected/", ProtectedView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
