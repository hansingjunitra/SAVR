import json
import math
import pandas as pd
import numpy as np
import datetime
from copy import deepcopy
from operator import attrgetter

with open('cards.json', 'r') as f:                              # gets database of all cards
    allcards = json.load(f)


cardlist=["OCBC 365 Card", "DBS Live Fresh Card","Citi Cashback","OCBC Frank"]   # initialize cards that user owns
cards1 = []
cards2 = []
cards3 = []
cards4 = []

for card in allcards:
    if card['name'] in cardlist:
        cards1.append(deepcopy(card))
        cards2.append(deepcopy(card))
        cards3.append(deepcopy(card))
        cards4.append(deepcopy(card))



def SAVRAlgo(spend, category, t):                              # recommends which card to use

    highest_utility = 0

    for card in cards1:                                          # loop through each card user has

        if card['total_rebate'] >= card['maximum_rebates']:     # removes cards that hit max rebates
            card['limit'] = 'Yes'
        

        for categories in card['categories']:                   # initialize values with 'Others' category 
            if categories['eligibility'] == 'Others':
                alpha = categories['percentage']
                cap = categories['cap']
                rebate = categories['rebate']

        for categories in card['categories']:                   # get percentage, cap and rebate for category  
            if categories['eligibility'] == category:
                alpha = categories['percentage']
                cap = categories['cap']
                rebate = categories['rebate']
                
                                                            
        delta = min(0, card['minimum_spending'] - card['total_spend'])      # update probabilities
        minspend = card['minimum_spending']
        pt = 0.3 * (math.exp(math.log(1/0.3)/31))**t
        pdelta = 0.3 * (math.exp(math.log(1.3/0.3)/minspend))**delta - 0.3
        card['probability'] = pt * pdelta
        

        # utility function
        z = 10 - 9/31*t
        netrebate = min( z*min(alpha*spend, cap-rebate) + card['total_rebate'], card['maximum_rebates'] )
        card['utility'] =  netrebate * (1- card['probability'])
        
        # maximize utility across cards
        if card['utility'] >= highest_utility and card['limit'] != 'Yes':
            highest_utility = card['utility']
    


    # identify card with highest utility and update its values
    for card in cards1:

        if card['utility'] == highest_utility:
            
            lst=[]

            for categories in card['categories']: 
                lst.append(categories['eligibility'])

                if categories['eligibility'] == category:
                    alphabest = categories['percentage']
                    capbest = categories['cap']
                    rebatebest = categories['rebate']

                    categories['spend'] += spend
                    categories['rebate'] += min(alphabest*spend, capbest-rebatebest)
            

            if category not in lst:
                for categories in card['categories']:
                    if categories['eligibility'] == 'Others':
                        alphabest = categories['percentage']
                        capbest = categories['cap']
                        rebatebest = categories['rebate']

                        categories['spend'] += spend
                        categories['rebate'] += min(alphabest*spend, capbest-rebatebest)
                

            
            bestcard = card['name']
            card['total_spend'] += spend
            card['total_rebate'] += min( min(alphabest*spend, capbest-rebatebest), card['maximum_rebates'] - card['total_rebate'] )

            if card['total_spend'] >= card['minimum_spending']:         # realise rebates only if minimum spending is hit
                card['realised_rebate'] = card['total_rebate']
            else:
                card['realised_rebate'] = card['total_spend']*0.003
    
    
    if all(card['limit']=='Yes' for card in cards1):            # if all cards hit max rebate, assign first card in list
        bestcard = cards1[0]['name']

    return bestcard




def MaxRebate(spend,category):

    maxrebate=0

    for card in cards2:                                         # loop through each card user has

        if card['total_rebate'] >= card['maximum_rebates']:     # removes cards that hit max rebates
            card['limit'] = 'Yes'
        
        if card['limit'] !='Yes' and card['maximum_rebates'] >= maxrebate:
            bestcard = card['name']

    if all(card['limit']=='Yes' for card in cards2):            # if all cards hit max rebate, assign first card in list
        bestcard = cards2[0]['name']


    for card in cards2:
        if card['name'] == bestcard:

            lst=[]

            for categories in card['categories']: 
                lst.append(categories['eligibility'])

                if categories['eligibility'] == category:
                    alphabest = categories['percentage']
                    capbest = categories['cap']
                    rebatebest = categories['rebate']

                    categories['spend'] += spend
                    categories['rebate'] += min(alphabest*spend, capbest-rebatebest)
            

            if category not in lst:
                for categories in card['categories']:
                    if categories['eligibility'] == 'Others':
                        alphabest = categories['percentage']
                        capbest = categories['cap']
                        rebatebest = categories['rebate']

                        categories['spend'] += spend
                        categories['rebate'] += min(alphabest*spend, capbest-rebatebest)
            

            card['total_spend'] += spend
            card['total_rebate'] += min( min(alphabest*spend, capbest-rebatebest), card['maximum_rebates'] - card['total_rebate'] )

            if card['total_spend'] >= card['minimum_spending']:         # realise rebates only if minimum spending is hit
                card['realised_rebate'] = card['total_rebate']  
            else:
                card['realised_rebate'] = card['total_spend']*0.003

            card['rebate_balance'] = card['maximum_rebates'] - card['realised_rebate']

    return bestcard



def MinSpend(spend,category):

    minspend=0

    for card in cards3:                                          # loop through each card user has

        if card['total_spend'] >= card['minimum_spending']:     # removes cards that hit max rebates
            card['limit'] = 'Yes'
        
        if card['limit'] !='Yes' and card['minimum_spending'] >= minspend:
            bestcard = card['name']

    if all(card['limit']=='Yes' for card in cards3):                # if all cards hit minimum spend
        bestvalue = max(card['rebate_balance'] for card in cards3)  # choose card with most rebates left to earn
        for card in cards3:
            if card['rebate_balance'] == bestvalue:
                bestcard = card['name']

    for card in cards3:
        if card['name'] == bestcard:

            lst=[]

            for categories in card['categories']: 
                lst.append(categories['eligibility'])

                if categories['eligibility'] == category:
                    alphabest = categories['percentage']
                    capbest = categories['cap']
                    rebatebest = categories['rebate']

                    categories['spend'] += spend
                    categories['rebate'] += min(alphabest*spend, capbest-rebatebest)
            

            if category not in lst:
                for categories in card['categories']:
                    if categories['eligibility'] == 'Others':
                        alphabest = categories['percentage']
                        capbest = categories['cap']
                        rebatebest = categories['rebate']

                        categories['spend'] += spend
                        categories['rebate'] += min(alphabest*spend, capbest-rebatebest)
            

            card['total_spend'] += spend
            card['total_rebate'] += min( min(alphabest*spend, capbest-rebatebest), card['maximum_rebates'] - card['total_rebate'] )

            if card['total_spend'] >= card['minimum_spending']:         # realise rebates only if minimum spending is hit
                card['realised_rebate'] = card['total_rebate']  
            else:
                card['realised_rebate'] = card['total_spend']*0.003

            card['rebate_balance'] = card['maximum_rebates'] - card['realised_rebate']

    return bestcard


def HighestPercent(spend,category):

    highestpercent=0

    for card in cards4:                                          # loop through each card user has
         for categories in card['categories']:                   # initialize with Others
             if categories['eligibility'] == 'Others' and categories['percentage'] >= highestpercent:
                 bestcard = card['name']

    for card in cards4:                                          # loop through each card user has
         for categories in card['categories']:
             if categories['eligibility'] == category and categories['percentage'] >= highestpercent:
                 bestcard = card['name']

    for card in cards4:
        if card['name'] == bestcard:

            lst=[]

            for categories in card['categories']: 
                lst.append(categories['eligibility'])

                if categories['eligibility'] == category:
                    alphabest = categories['percentage']
                    capbest = categories['cap']
                    rebatebest = categories['rebate']

                    categories['spend'] += spend
                    categories['rebate'] += min(alphabest*spend, capbest-rebatebest)
            

            if category not in lst:
                for categories in card['categories']:
                    if categories['eligibility'] == 'Others':
                        alphabest = categories['percentage']
                        capbest = categories['cap']
                        rebatebest = categories['rebate']

                        categories['spend'] += spend
                        categories['rebate'] += min(alphabest*spend, capbest-rebatebest)
            

            card['total_spend'] += spend
            card['total_rebate'] += min( min(alphabest*spend, capbest-rebatebest), card['maximum_rebates'] - card['total_rebate'] )

            if card['total_spend'] >= card['minimum_spending']:         # realise rebates only if minimum spending is hit
                card['realised_rebate'] = card['total_rebate']  
            else:
                card['realised_rebate'] = card['total_spend']*0.003

            card['rebate_balance'] = card['maximum_rebates'] - card['realised_rebate']

    return bestcard


def getRandomSpending(cat,classi):     # generate categorical spending for simulation with different frequency and random amounts

    if cat == 'Online':
        if classi == 'less':
            spend = np.random.uniform(5,10)
            prob = np.random.uniform(0,14)

        elif classi == 'between':
            spend = np.random.uniform(10,30)
            prob = np.random.uniform(0,14)

        elif classi == 'more':
            spend = np.random.uniform(30,50)
            prob = np.random.uniform(0,14)

    elif cat == 'Dining':   

        if classi == 'less':
            spend = np.random.uniform(10,26)
            prob = np.random.uniform(0,1)

        elif classi == 'between':
            spend = np.random.uniform(26,80)
            prob = np.random.uniform(0,1)

        elif classi == 'more':   
            spend = np.random.uniform(80,200)
            prob = np.random.uniform(0,1)

    elif cat == 'Grocery':
        
        if classi == 'less':
            spend = np.random.uniform(20,50)
            prob = np.random.uniform(0,2)
        
        elif classi == 'between':
            spend = np.random.uniform(50,80)
            prob = np.random.uniform(0,2)

        elif classi == 'more':
            spend = np.random.uniform(80,100)
            prob = np.random.uniform(0,2)
    
    elif cat == 'Transport':

        if classi == 'less':
            spend = np.random.uniform(5,15)
            prob = np.random.uniform(0,7)

        elif classi == 'between':
            spend = np.random.uniform(15,20)
            prob = np.random.uniform(0,7)

        elif classi == 'more':
            spend = np.random.uniform(20,30)
            prob = np.random.uniform(0,7)

    elif cat == 'Petrol':

        if classi == 'less':
            spend = np.random.uniform(0,40)
            prob = np.random.uniform(0,5)

        elif classi == 'between':
            spend = np.random.uniform(40,60)
            prob = np.random.uniform(0,5)

        elif classi == 'more':
            spend = np.random.uniform(60,80)
            prob = np.random.uniform(0,5)
    
    elif cat == 'Travel':

        if classi == 'less':
            spend = np.random.uniform(1000,1500)
            prob = np.random.uniform(0,365)

        elif classi == 'between':
            spend = np.random.uniform(1500,3000)
            prob = np.random.uniform(0,365)

        elif classi == 'more':
            spend = np.random.uniform(3000,4000)
            prob = np.random.uniform(0,365)
    
    elif cat == 'Food Delivery':

        if classi == 'less':
            spend = np.random.uniform(6,10)
            prob = np.random.uniform(0,3)

        elif classi == 'between':
            spend = np.random.uniform(10,20)
            prob = np.random.uniform(0,3)

        elif classi == 'more':
            spend = np.random.uniform(20,30)
            prob = np.random.uniform(0,3)
    
    elif cat == 'Fast Food':

        if classi == 'less':
            spend = np.random.uniform(6,10)
            prob = np.random.uniform(0,7)

        elif classi == 'between':
            spend = np.random.uniform(10,20)
            prob = np.random.uniform(0,7)

        elif classi == 'more':
            spend = np.random.uniform(20,30)
            prob = np.random.uniform(0,7)


    return spend, prob


sumrebate = np.zeros((1,4))

def SimulateOneMonth(classi):

    monthsimulation = np.zeros((1,11))
    categorylist = ['Dining', 'Grocery', 'Food Delivery', 'Petrol', 'Transport', 'Fast Food', 'Online', 'Travel']
    categorydict = {'Dining': 0, 'Grocery': 0, 'Food Delivery': 0, 'Petrol': 0, 
                    'Transport': 0, 'Fast Food': 0, 'Online': 0, 'Travel': 0, 'Total': 0}

    for i in range(1,32):                                           # for each day of one month

        for cat in categorylist:                                    # for each category of spend

            spend, prob = getRandomSpending(cat,classi)             # generate spending

            if prob <=1:                                            # spend occurs with differing probability
                day = i
                spendamount = spend
                spendcategory = cat
                categorydict[spendcategory] += spend
                categorydict['Total'] += spend

                recommendedcard1 = SAVRAlgo(spendamount, spendcategory, i)
                sumearnedrebates1 = sum(card['realised_rebate'] for card in cards1)

                recommendedcard2 = MaxRebate(spendamount, spendcategory)
                sumearnedrebates2 = sum(card['realised_rebate'] for card in cards2)

                recommendedcard3 = MinSpend(spendamount, spendcategory)
                sumearnedrebates3 = sum(card['realised_rebate'] for card in cards3)

                recommendedcard4 = HighestPercent(spendamount, spendcategory)
                sumearnedrebates4 = sum(card['realised_rebate'] for card in cards4)

                monthsimulation = np.append(monthsimulation, [[day,spendamount,spendcategory,recommendedcard1,sumearnedrebates1,
                                                               recommendedcard2,sumearnedrebates2,recommendedcard3,sumearnedrebates3,
                                                               recommendedcard4,sumearnedrebates4]], axis = 0)

    sumspend = categorydict['Total']
    sumlist = [sumearnedrebates1/sumspend*100,sumearnedrebates2/sumspend*100,sumearnedrebates3/sumspend*100,sumearnedrebates4/sumspend*100]
    monthsimulation = np.append(monthsimulation, [['Total Rebate Percentage',None,None,None,sumlist[0],
                                None,sumlist[1],None,sumlist[2],None,sumlist[3]]],axis=0)      

    lst=[]
    for i in categorydict:
        lst.append(i + ': $' + str(math.floor(categorydict[i])))
    monthsimulation = np.append(monthsimulation, [[lst[0],lst[1],lst[2],lst[3],lst[4],lst[5],lst[6],lst[7],lst[8],
                                                   'Min Spend: $2400','Max Rebate: $5000']], axis = 0)

    monthsimulation = pd.DataFrame(monthsimulation, columns=['Day','Spend','Category','Best Card(SAVR Algo)', 
                                                             'Realised Rebates(SAVR Algo)','Best Card(Max Rebate)', 
                                                             'Realised Rebates(Max Rebate)','Best Card(Min Spend)', 
                                                             'Realised Rebates(Min Spend)','Best Card(Highest%)',
                                                             'Realised Rebates-Highest%'])
                                                             
    minspend = 2200
    maxrebate = 4800
    if categorydict['Total'] <= minspend:
        name = 'less'
    elif categorydict['Total'] >= minspend and categorydict['Total'] <= maxrebate:
        name = 'between'  
    else:
        name = 'more'  

    global sumrebate
    for i in range(4):
        sumrebate[0][i] += sumlist[i]
    
    #monthsimulation.to_csv('MonthSimulation ' + name + ' {}.csv' .format(datetime.datetime.now().strftime("%d%m%Y-%H%M%S")))

    return monthsimulation


def SimulateNMonths(n,classi):

    for i in range(n):
        cards1 = []
        cards2 = []
        cards3 = []
        cards4 = []

        for card in allcards:
            if card['name'] in cardlist:
                cards1.append(deepcopy(card))
                cards2.append(deepcopy(card))
                cards3.append(deepcopy(card))
                cards4.append(deepcopy(card))

        SimulateOneMonth(classi)
    
    avgrebate = sumrebate/n
    avgrebate = pd.DataFrame(avgrebate, columns=['SAVR Algo', 'Max Rebate', 'Min Spend', 'Highest %'])
    print(sumrebate)
    print(avgrebate)

SimulateNMonths(3,'between')
