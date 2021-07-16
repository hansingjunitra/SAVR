import json
import math
from copy import deepcopy
from datetime import datetime

# cardlist=["OCBC 365 Card", "DBS Live Fresh Card","Citi Cashback","OCBC Frank"]   # cards that user owns
# cards = []

# for card in allcards:                                           # initialize with cards that user owns
#     if card['name'] in cardlist:
#         cards.append(deepcopy(card))


def getBestCard(filename, spend, category):
    with open(filename, 'r') as f:                              # gets database of all cards
        allcards = json.load(f)
        cards = []
        for card in allcards: 
            cards.append(deepcopy(card))
            
        return SAVRAlgo(spend, category, cards)

def SAVRAlgo(spend, category, cards):                               # recommends which card to use

    highest_utility = 0

    for card in cards:                                          # loop through each card the user owns

        for categories in card['categories']:                   # initialize values with 'Others' category 
            if categories['eligibility'] == 'Others':
                alpha = categories['percentage']
                cap = categories['cap']
                rebate = categories['rebate']

        for categories in card['categories']:                   # get percentage, cap and rebate for category if exists
            if categories['eligibility'] == category:
                alpha = categories['percentage']
                cap = categories['cap']
                rebate = categories['rebate']
                
                                                            
        delta = min(0, card['minimum_spending'] - card['total_spend'])      # update probabilities
        minspend = card['minimum_spending']
        pt = 0.3 * (math.exp(math.log(1/0.3)/31))**datetime.now().day
        pdelta = 0.3 * (math.exp(math.log(1.3/0.3)/minspend))**delta - 0.3
        probability = pt * pdelta
        

        # utility function
        # z = (a-b)*t/31 + b
        netrebate = min( min(alpha*spend, cap-rebate) + card['total_rebate'], card['maximum_rebates'] )
        utility =  netrebate * (1- probability)
        

        # maximize utility across cards that have not hit max rebate
        
        if utility >= highest_utility and card['total_rebate'] < card['maximum_rebates']:
            bestcard = card['name']
    

    if all(card['total_rebate'] >= card['maximum_rebates'] for card in cards):  # if all cards hit max rebate, assign first card in list
        bestcard = cards[0]['name']


    return bestcard

SAVRAlgo(100,'Dining')
