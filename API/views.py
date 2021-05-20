from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import TemplateView

# Create your views here.
def API(request):
  return render(request, 'API/API.html')
  
def copy(request):
  return render(request, 'API/copy.html')