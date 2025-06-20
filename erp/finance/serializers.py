from rest_framework import serializers
from .models import Budget, Expense, Income, Payment, Procurement, Transaction,  CustomUser, InventoryItem
from django.contrib.auth.models import User

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser  # ✅ Ensure it references your CustomUser model
        fields = ['username', 'email', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}
        
    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("❌ Email already exists.")
        return value

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)  # ✅ Ensure this method correctly creates a user
    
class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = ['id', 'name', 'category', 'stock', 'price']

class ProcurementSerializer(serializers.ModelSerializer):
    product = serializers.CharField(source='product.name')  # ✅ show name instead of ID

    class Meta:
        model = Procurement
        fields = ['id', 'product', 'quantity', 'supplier', 'status', 'requested_at']

#Financeserializers

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = '__all__'


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
