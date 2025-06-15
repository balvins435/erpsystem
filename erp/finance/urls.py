from django.urls import path, include
from .views import BudgetViewSet, ExpenseViewSet, IncomeViewSet, PaymentViewSet, RegisterUserView, TransactionListCreateView, TransactionDetailView, dashboard_summary, inventory_list, login_view
from django.contrib.auth.views import PasswordResetView
from . import views

from rest_framework.routers import DefaultRouter
from .views import ProcurementViewSet

router = DefaultRouter()
router.register(r'procurements', ProcurementViewSet),
router.register('budgets', BudgetViewSet),
router.register('expenses', ExpenseViewSet),
router.register('income', IncomeViewSet),
router.register('payments', PaymentViewSet),

urlpatterns = [
    path('', include(router.urls)),
    path('api/finance/', include(router.urls)),

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

print("ROUTER URLS:", router.urls)

