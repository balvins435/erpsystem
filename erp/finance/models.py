from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('Admin', 'Admin'),
        ('Finance_Manager', 'Finance Manager'),
        ('Employee', 'Employee'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Employee')

class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('Income', 'Income'),
        ('Expense', 'Expense'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_type} - {self.amount} ({self.category})"

class InventoryItem(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    stock = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Procurement(models.Model):
    product = models.ForeignKey(InventoryItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    supplier = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=[("Pending", "Pending"), ("Approved", "Approved")])
    requested_at = models.DateTimeField(auto_now_add=True)

    def receive(self):
        self.status = "Received"
        self.product.stock += self.quantity
        self.product.save()
        self.save()

#financemodels

class Budget(models.Model):
    department = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    year = models.IntegerField()
    approved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.department} - {self.year}"


class Expense(models.Model):
    category = models.CharField(max_length=100)
    description = models.TextField()
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    date = models.DateField()
    uploaded_receipt = models.FileField(upload_to='receipts/', null=True, blank=True)

    def __str__(self):
        return f"{self.category} - {self.amount}"


class Income(models.Model):
    source = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    date_received = models.DateField()
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.source} - {self.amount}"


class Payment(models.Model):
    vendor = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Paid', 'Paid'), ('Overdue', 'Overdue')], default='Pending')

    def __str__(self):
        return f"{self.vendor} - {self.status}"

