from backend.savr.api.RecommendationAlgo import getBestCard
from django.shortcuts import render, HttpResponse
import RecommendationAlgo
import json

# Create your views here.

def savrAlgo(request):
    if request.method == "GET":
        return HttpResponse("Coming soon...")


def userAlgo(request, user):
    if request.method == "POST":
        filename = user+".json"
        data = request.data
        with open(filename, 'w') as f:
            json.dump(data, f)
            
    elif request.method == "GET":
        spend = request.META['spend']
        category = request.META['category']
        filename = user+".json"
        bestcard = getBestCard(filename, spend, category)
        return HttpResponse(bestcard)
