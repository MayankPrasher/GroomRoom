from django.shortcuts import render, redirect

def landing_view(request):
    if not request.session.get('is_logged_in'):
        return redirect('Auth')
    return render(request, 'Barber/landing.html', {})