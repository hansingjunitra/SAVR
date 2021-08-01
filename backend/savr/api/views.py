from api.RecommendationAlgo import getBestCard, getBestCardv2, SAVRAlgo
from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json
# Create your views here.

@csrf_exempt
@api_view(['POST'])
def savrAlgo(request):
    # print(request.POST)
    # if request.method == "POST":
    #     print("Got called")
    #     # json_data = json.loads(request.body) # request.raw_post_data w/ Django < 1.4
    #     print(request.body)
    # print(request.data)
    data = request.data
    spend = data['amount']
    category = data['category']
    cards = data['data']

    #     print(request)
    # bestcard = savrAlgo(filename, spend, category)
    bestcard =SAVRAlgo(spend, category, cards)
    print(bestcard)
    # print(spend, category)
    #     # try:
    #     #     data = json_data['data']
    #     # except KeyError:
    #     #     HttpResponseServerError("Malformed data!")
    return HttpResponse("Got json data")
    #     # return HttpResponse("return result here")


@csrf_exempt
@api_view(['CALL', 'GET', 'POST', 'TEST'])
def userAlgo(request, user):
    if request.method == "POST":
        # print(request.data)
        # filename = user+".json"
        # data = request.data
        # with open(filename, 'w') as f:
        #     json.dump(data, f)
        # spend = request.META['HTTP_SPEND']
        # category = request.META['HTTP_CATEGORY']
        # filename = user+".json"
        # bestcard = getBestCard(filename, spend, category)
        # return HttpResponse(bestcard)
        return HttpResponse("Return sth")

    elif request.method == "CALL":
        print("received")
        data = request.data
        spend = request.META['HTTP_SPEND']
        category = request.META['HTTP_CATEGORY']
        bestcard = getBestCardv2(data, spend, category)
        return HttpResponse(bestcard)
            
    # elif request.method == "GET":
    #     spend = request.META['HTTP_SPEND']
    #     category = request.META['HTTP_CATEGORY']
    #     filename = user+".json"
    #     bestcard = getBestCard(filename, spend, category)
    #     return HttpResponse(bestcard)

    # elif request.method == "TEST":
    #     spend = request.META['HTTP_SPEND']
    #     data = request.data
    #     print(data)
    #     return HttpResponse(data)
