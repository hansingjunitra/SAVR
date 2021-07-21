from api.RecommendationAlgo import getBestCard, getBestCardv2
from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json

# Create your views here.

def savrAlgo(request):
    if request.method == "GET":
        return HttpResponse("Coming soon...")

@csrf_exempt
@api_view(['CALL', 'GET', 'POST', 'TEST'])
def userAlgo(request, user):
    if request.method == "POST":
        filename = user+".json"
        data = request.data
        with open(filename, 'w') as f:
            json.dump(data, f)
        spend = request.META['HTTP_SPEND']
        category = request.META['HTTP_CATEGORY']
        filename = user+".json"
        bestcard = getBestCard(filename, spend, category)
        return HttpResponse(bestcard)

    elif request.method == "CALL":
        data = request.data
        spend = request.META['HTTP_SPEND']
        category = request.META['HTTP_CATEGORY']
        bestcard = getBestCardv2(data, spend, category)
        return HttpResponse(bestcard)
            
    elif request.method == "GET":
        spend = request.META['HTTP_SPEND']
        category = request.META['HTTP_CATEGORY']
        filename = user+".json"
        bestcard = getBestCard(filename, spend, category)
        return HttpResponse(bestcard)

    elif request.method == "TEST":
        spend = request.META['HTTP_SPEND']
        data = request.data
        print(data)
        return HttpResponse(data)
