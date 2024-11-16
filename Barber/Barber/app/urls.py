from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing_view, name="landing"),
    path('logout/', views.logout_view, name="logout"),
]