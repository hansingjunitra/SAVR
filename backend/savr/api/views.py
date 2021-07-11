from django.shortcuts import render, HttpResponse

# Create your views here.

def Index(request):
    return HttpResponse("Ok")

def savrAlgo(request):
    return HttpResponse("Coming soon...")