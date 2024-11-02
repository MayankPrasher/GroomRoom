from django.shortcuts import render
from django.shortcuts import render

def landing_view(request):
    return render(request, 'Barber/landing.html', {})

