import json
import math
from copy import deepcopy
from datetime import datetime

# cardlist=["OCBC 365 Card", "DBS Live Fresh Card","Citi Cashback","OCBC Frank"]   # cards that user owns
# cards = []

# for card in allcards:                                           # initialize with cards that user owns
#     if card['name'] in cardlist:
#         cards.append(deepcopy(card))


def getBestCard(spend, category, cards):
    # with open(filename, 'r') as f:                              # gets database of all cards
    #     allcards = json.load(f)
    #     cards = []
    #     for card in allcards: 
    #         cards.append(deepcopy(card))

            
    return SAVRAlgo(spend, category, cards)

def getBestCardv2(data, spend, category):
    allcards = data
    cards = []
    for card in allcards: 
        cards.append(deepcopy(card))
        
    return SAVRAlgo(spend, category, cards)

def SAVRAlgo(spend, category, cards):                               # recommends which card to use
    highest_utility = 0
    spend = float(spend)
    total_rebate = 0
    card_utility_list = []

    for card in cards:                                          # loop through each card the user owns
        totalSpent = card['totalSpent']
        for categories in card['categories']:                   # initialize values with 'Others' category 
            if categories['eligibility'] == 'Others':
                alpha = categories['percentage']
                cap = categories['cap']
                if totalSpent < card['minimum_spending']:
                    rebate = card['spendingBreakdown']['Others'] * 0.03 
                else:
                    rebate =  card['spendingBreakdown']['Others'] * categories['percentage'] 
                rebate = card['spendingBreakdown'][categories['eligibility']] * alpha

        for categories in card['categories']:                   # get percentage, cap and rebate for category if exists
            total_rebate += min(card['spendingBreakdown'][categories['eligibility']] * alpha, categories["cap"])
            if categories['eligibility'] == category:
                alpha = categories['percentage']
                cap = categories['cap']
                # rebate = categories['rebate']
                # if totalSpent < card['minimum_spending']:
                #     rebate = card['spendingBreakdown'][category] * 0.03 
                # else:
                #     rebate =  card['spendingBreakdown'][category] * categories['percentage'] 
        
                # rebate = min(card['spendingBreakdown'][categories['eligibility']] * alpha, cap)
                
                                                            
        delta = min(0, card['minimum_spending'] - card['totalSpent'])      # update probabilities
        minspend = card['minimum_spending']
        pt = 0.27 * (math.exp(math.log(1/0.3)/31))**datetime.now().day
        if minspend != 0:
            pdelta = 0.27 * (math.exp(math.log(1.3/0.3)/minspend))**delta - 0.27
        else:
            pdelta = 1

        probability = pt * pdelta
        
        total_rebate = 0
        for categories in card['categories']: 
            # print(categories)
            if totalSpent < card['minimum_spending']:
                # print(categories, card['spendingBreakdown'][categories])

                total_rebate += card['spendingBreakdown'][categories['eligibility']] * 0.03 
            else:
                total_rebate +=  card['spendingBreakdown'][categories['eligibility']] * categories['percentage'] 

        # utility function
        # z = (a-b)*t/31 + b
        netrebate = min( (10-9/31*datetime.now().day) * min(alpha*spend, cap-rebate) + total_rebate, card['maximum_rebates'] )
        utility =  netrebate * (1- probability)
        print("Utility: ", utility, card['card_name'])    
        card_utility_list.append({"card_name": card["card_name"], "utility": utility})    

        # maximize utility across cards that have not hit max rebate
        
        if utility >= highest_utility and total_rebate < card['maximum_rebates']:
            highest_utility = utility
        if utility >= highest_utility and total_rebate < card['maximum_rebates']:
            bestcard = card['card_name']
    

    if all(total_rebate >= card['maximum_rebates'] for card in cards):  # if all cards hit max rebate, assign first card in list
        bestcard = cards[0]['card_name']

    print(card_utility_list)
    card_utility_list.sort(key=lambda x: x['utility'], reverse=True)

    recommended_card_list = []
    for card in card_utility_list:
        recommended_card_list.append(card['card_name'])

    return  recommended_card_list

# SAVRAlgo(100,'Dining')


