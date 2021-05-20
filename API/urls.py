from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
   path('', views.API, name='API'),
   path('copy', views.copy, name='copy'),
]
