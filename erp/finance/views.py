from rest_framework import generics
from .models import Procurement, Transaction, CustomUser, InventoryItem
from .serializers import ProcurementSerializer, TransactionSerializer, UserSerializer, InventoryItemSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdmin, IsFinanceManager, IsEmployee
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


@api_view(['POST'])  # ✅ Ensure it allows POST
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(["GET"])
def dashboard_summary(request):
    transactions_count = Transaction.objects.count()
    approvals_count = Transaction.objects.filter(status="Pending").count()

    return Response({"transactions": transactions_count, "approvals": approvals_count})

@api_view(["GET"])
def inventory_list(request):
    inventory = InventoryItem.objects.all()
    data = [{"id": item.id, "name": item.name, "category": item.category, "stock": item.stock, "price": item.price} for item in inventory]
    return Response(data)

@api_view(["GET"])
def inventory_list(request):
    inventory = InventoryItem.objects.all()
    data = [
        {
            "id": item.id,
            "name": item.name,
            "category": item.category,
            "stock": item.stock,
            "price": item.price,
            "low_stock": item.stock < 5  # ✅ Alert if stock is below threshold
        } 
        for item in inventory
    ]
    return Response(data)

@api_view(['POST'])
def add_inventory_item(request):
    serializer = InventoryItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def request_procurement(request):
    data = request.data
    product = InventoryItem.objects.get(id=data["product_id"])
    
    # Simulate procurement request creation
    procurement = Procurement.objects.create(
        product=product,
        quantity=data["quantity"],
        supplier=data["supplier"],
        status="Pending"
    )
    return Response({"message": "Procurement request submitted!"})

@csrf_exempt  # Needed if you're sending requests from frontend without CSRF token
def add_inventory(request):
    if request.method == "POST":
        data = json.loads(request.body)
        # handle saving product (e.g., Product.objects.create(...))
        return JsonResponse({"message": "Product added successfully!"})
    return JsonResponse({"error": "Only POST method allowed"}, status=405)

@api_view(['PATCH'])
def update_stock(request, pk):
    try:
        product = InventoryItem.objects.get(pk=pk)
        change = int(request.data.get("stock", 0))
        product.stock += change
        product.save()
        return Response({"message": "Stock updated", "new_stock": product.stock})
    except InventoryItem.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

@api_view(["POST"])
def procure_item(request):
    product_id = request.data.get("product_id")
    quantity = int(request.data.get("quantity"))
    supplier = request.data.get("supplier")

    try:
        product = InventoryItem.objects.get(id=product_id)
        # Maybe save to a Procurement table?
        product.stock += quantity
        product.save()
        return Response({"message": "Procurement successful"})
    except InventoryItem.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

@api_view(["GET"])
def procurement_history(request):
    procurements = Procurement.objects.all().order_by("-requested_at")
    serializer = ProcurementSerializer(procurements, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get_inventory_items(request):
    items = InventoryItem.objects.all()
    serializer = InventoryItemSerializer(items, many=True)
    return Response(serializer.data)

class TransactionListCreateView(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]  # 🔒 Require login

class TransactionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]  # 🔒 Require login

class RegisterUserView(generics.CreateAPIView):
    queryset=CustomUser.objects.all()
    serializer_class = UserSerializer

class TransactionListCreateView(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]  # 🔒 Require login

class TransactionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]  # 🔒 Require login

from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'Admin'

class IsFinanceManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'Finance_Manager'

class IsEmployee(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'Employee'
