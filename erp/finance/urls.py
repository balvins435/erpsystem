from django.urls import path, include
from .views import RegisterUserView, TransactionListCreateView, TransactionDetailView, dashboard_summary, inventory_list, login_view
from django.contrib.auth.views import PasswordResetView
from . import views


urlpatterns = [
    path('transactions/', TransactionListCreateView.as_view(), name='transaction-list'),
    path('transactions/<int:pk>/', TransactionDetailView.as_view(), name='transaction-detail'),
    path('register/', RegisterUserView.as_view(), name='register-user'),
    path('auth/', include('finance.auth_views')),
    path("auth/reset-password/", PasswordResetView.as_view(), name="password_reset"),
    path('auth/login/', login_view),
    path("dashboard-summary/", dashboard_summary, name="dashboard_summary"),
    path("inventory/", inventory_list, name="inventory_list"),
    # path('api/inventory/add/', views.add_inventory_item, name='add_inventory'),
    path("procurement/", views.procure_item, name="procure_item"),
    
]


