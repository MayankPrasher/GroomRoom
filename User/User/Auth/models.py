from django.db import models

# class Queue(models.Model):
#     id = models.BigIntegerField(primary_key=True)
#     name = models.CharField(max_length=100)

#     def __str__(self):
#         return f"Queue {self.id} - {self.name}"

# class User(models.Model):
#     user_code = models.CharField(max_length=100, unique=True)
#     password = models.CharField(max_length=100)
#     user_name = models.CharField(max_length=20, null=True)
#     user_email = models.EmailField(max_length=100, unique=True, null=True)
#     user_phone = models.BigIntegerField(unique=True, null=True)
#     queue_id = models.ForeignKey(Queue, on_delete=models.CASCADE, null=True, related_name="users")
#     pending_pay = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

#     def __str__(self):
#         return self.user_code