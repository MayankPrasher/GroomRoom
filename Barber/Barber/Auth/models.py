from django.db import models

class Barber(models.Model):
    barber_code = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    barber_name = models.CharField(max_length=20, null=True)
    barber_email = models.EmailField(max_length=100, unique=True, null=True)
    barber_phone = models.BigIntegerField(unique=True, null=True)
    wallet_money = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return self.barber_code