from rest_framework import serializers
from .models import Procurement, Transaction,  CustomUser, InventoryItem
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
        fields = '__all__'  # or list the specific fields

class ProcurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Procurement
        fields = '__all__'