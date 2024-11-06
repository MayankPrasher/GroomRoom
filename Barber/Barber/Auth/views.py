from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Barber

def home_view(request):
    if request.method == 'POST':
        barber_code = request.POST.get('barber_code')
        password = request.POST.get('password')

        try:
            # isse ye barber_007 ko database se uthaega aur usse match krega
            barber = Barber.objects.get(barber_code=barber_code)

            # phir check krega password shi hai to redirect kr dega landing page pe
            if barber.password == password:
                request.session['is_logged_in'] = True
                return redirect('landing')
            else:
                messages.error(request, 'Invalid Barber Code or Password')
        
        except Barber.DoesNotExist:
            messages.error(request, 'Invalid Barber Code or Password')
    return render(request, 'Auth/auth.html', {})
