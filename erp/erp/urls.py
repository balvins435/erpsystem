from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from finance import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('finance.urls')),  # Routes like /api/register/ or /api/transactions/ etc.
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/inventory/add/', views.add_inventory_item, name='add_inventory'),
    path("api/inventory/update/<int:pk>/", views.update_stock, name="update_stock"),
    path("procurement/", views.procure_item, name="procure_item"),
    path("api/procurement/history/", views.procurement_history, name="procurement_history"),

]
