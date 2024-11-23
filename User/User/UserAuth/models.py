from django.db import models

class Queue(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Customer(models.Model):
    customer_code = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    customer_name = models.CharField(max_length=20, null=True)
    customer_email = models.EmailField(max_length=100, unique=True, null=True)
    customer_phone = models.BigIntegerField(unique=True, null=True)
    queue_id = models.ForeignKey(Queue, on_delete=models.CASCADE, null=True, related_name="customers")
    pending_pay = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return self.customer_code