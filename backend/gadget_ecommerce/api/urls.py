from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

# my views
from login.views import LoginView, ProtectedView
from accounts.views import RegisterView
from product.views import ProductView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("protected/", ProtectedView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("", ProductView.as_view(), name="produts"),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
