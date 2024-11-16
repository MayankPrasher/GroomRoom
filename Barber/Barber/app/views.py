from django.shortcuts import render, redirect

def landing_view(request):
    if not request.session.get('is_logged_in'):
        return redirect('Auth')
    return render(request, 'Barber/landing.html', {})

<<<<<<< HEAD
def logout_view(request):
    if 'is_logged_in' in request.session:
        del request.session['is_logged_in']
    return redirect('Auth')
=======
def logout_view(request): 
    if request.method == "POST":
        if 'is_logged_in' in request.session:
            del request.session['is_logged_in']
        return redirect('Auth')
    else:
        return render(request, 'Barber/landing.html', {})
>>>>>>> 05c7ad8ea70e1b60d4d30b721df8009494248594
