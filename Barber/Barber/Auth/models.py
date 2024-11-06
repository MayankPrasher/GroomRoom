from django.db import models

class Barber(models.Model):
    barber_code = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.barber_code