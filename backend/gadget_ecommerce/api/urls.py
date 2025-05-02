from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

# my views
from login.views import LoginView, ProtectedView
from accounts.views import RegisterView
from product.views import ProductView
from cart.views import CartView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("protected/", ProtectedView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("getproducts/", ProductView.as_view(), name="produts"),
    path("addtocart/", CartView.as_view(), name="addtocart"),
    path("getcartitems/<uuid:userid>/", CartView.as_view(), name="getcartitems"),
    path(
        "deleteproduct/<uuid:productid>/", ProductView.as_view(), name="delete_product"
    ),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
