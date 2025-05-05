from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

# my views
from login.views import LoginView, ProtectedView
from accounts.views import RegisterView
from product.views import ProductView
from cart.views import CartView
from orders.views import OrderView, OrderItemView, AdminStatusView
from contact.views import ContactView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("logout/", LoginView.as_view()),
    path("protected/", ProtectedView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("getproducts/", ProductView.as_view(), name="produts"),
    path("addtocart/", CartView.as_view(), name="addtocart"),
    path("deletecart/<uuid:cartid>/", CartView.as_view(), name="deletecart"),
    path("makeorder/", OrderView.as_view(), name="makeorder"),
    path("getcartitems/<uuid:userid>/", CartView.as_view(), name="getcartitems"),
    path(
        "deleteproduct/<uuid:productid>/", ProductView.as_view(), name="delete_product"
    ),
    path("getcutomerorder/", OrderItemView.as_view(), name="getcustomerorder"),
    path("updatestatus/", AdminStatusView.as_view(), name="updatestatus"),
    path("contactus/", ContactView.as_view(), name="contact-us"),
    path("getinquiries/", ContactView.as_view(), name="get-inquiries"),
    path(
        "deleteinquiries/<uuid:contactid>/",
        ContactView.as_view(),
        name="delete-inquiries",
    ),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
