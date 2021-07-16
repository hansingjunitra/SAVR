
const ocbc365 = function(card, mode) {
    const rebateCategory = {"Dining":0.06, "Groceries":0.03 ,"Transport":0.03 ,"Petrol":0.05 ,"Utilities":0.03 ,"Travel":0.03}
    var totalSpend = card.totalSpent;
    var othersRebate = 0;
    var categoryRebate = 0;

    if (mode == 1) {totalSpend=1000}

    for (const category in card.spendingBreakdown) {
        if (category in rebateCategory && totalSpend>=800 && categoryRebate<=80) {
            var rebate = card.spendingBreakdown[category] * rebateCategory[category]
            categoryRebate += rebate;
            if (categoryRebate > 80) {
                var excess = (categoryRebate - 80) / rebateCategory[category]
                categoryRebate = 80
                othersRebate += excess * 0.003
            }
        }
        else {
            var rebate = card.spendingBreakdown[category] * 0.003
            othersRebate += rebate
        }
    }

    return categoryRebate + othersRebate
}

const dbsLiveFresh = function(card, mode) {
    const rebateCategory = {"Online":0.05, "Contactless":0.05};
    var totalRebate = 0;
    var totalSpend = card.totalSpent;
    var othersRebate = 0;

    if (mode == 1) {totalSpend=1000}

    for (const category in card.spendingBreakdown) {
        if (category in rebateCategory && totalSpend>=600) {
            var rebate = card.spendingBreakdown[category] * rebateCategory[category]
            if (rebate>20) {
                var excess = (rebate - 20) / rebateCategory[category]
                rebate = 20
                if (othersRebate<=20) {
                    othersRebate += excess * 0.003
                }
            }
            totalRebate += rebate;
        }
        else {
            var rebate = card.spendingBreakdown[category] * 0.003
            othersRebate += rebate
        }
    }
    if (othersRebate>20) {othersRebate = 20}

    return totalRebate + othersRebate
}

const maybankFandF = function(card) {
    const rebateCategory = ["Food Delivery", "Fast Food", "Groceries", "Transport", "Petrol", "Learning/Retail", "Tele/Streaming"]
    var totalRebate = 0;
    var totalSpend = card.totalSpent;
    var totalSpendCategory = 0;

    for (const category in card.spendingBreakdown) {
        if (category in rebateCategory) {
            if (totalRebate<80) {
                if (totalSpend>=800) {
                    var rebate = card.spendingBreakdown[category] * 0.08
                }
                else if (totalSpend>=500) {var rebate = card.spendingBreakdown[category] * 0.05}
                else {var rebate = card.spendingBreakdown[category] * 0.003}
            }
            else {var rebate = card.spendingBreakdown[category] * 0.003}
            totalRebate += rebate;
        }
        else {
            rebate = card.spendingBreakdown[category] * 0.003
            totalRebate += rebate
        }
    }

    return totalRebate
}

const hsbcAdvance = function(card, deposit) {
    var totalSpend = card.totalSpent;

    if (totalSpend>2000) {var rebate = totalSpend * 0.025}
    else {var rebate = totalSpend * 0.015}
    if (rebate>70) {rebate = 70}

    //deposit = true if >=2000
    if (deposit) {
        var additionalRebate = totalSpend * 0.01
        if (additionalRebate>300) {additionalRebate = 300}
        return rebate+additionalRebate
    }
    else {
        return rebate
    }
}

const citiCashback = function(card, mode) {
    const rebateCategory = {"Dining":0.06, "Groceries":0.08, "Petrol":0.08}
    var totalSpend = card.totalSpent;
    var othersRebate = 0;
    var categoryRebate = 0;

    if (mode == 1) {totalSpend=1000}

    for (const category in card.spendingBreakdown) {
        if (category in rebateCategory && totalSpend>=800 && categoryRebate<=80) {
            var rebate = card.spendingBreakdown[category] * rebateCategory[category]
            categoryRebate += rebate;
            if (categoryRebate > 80) {
                var excess = (categoryRebate - 80) / rebateCategory[category]
                categoryRebate = 80
                othersRebate += excess * 0.0025
            }
        }
        else {
            var rebate = card.spendingBreakdown[category] * 0.0025
            othersRebate += rebate
        }
    }

    return categoryRebate + othersRebate
}

const frank = function(card, mode) {
    const rebateCategory = {"Online":0.06, "Contactless/Forex":0.06}
    var totalSpend = card.totalSpent;
    var totalRebate = 0;
    var othersRebate = 0;

    if (mode == 1) {totalSpend=1000}

    for (const category in card.spendingBreakdown) {
        if (category in rebateCategory && totalSpend>=600) {
            var rebate = card.spendingBreakdown[category] * rebateCategory[category]
            if (rebate>25) {
                var excess = (rebate - 25) / rebateCategory[category]
                rebate = 25
                if (othersRebate<=25) {
                    othersRebate += excess * 0.003
                }
            }
            totalRebate += rebate;
        }
        else {
            var rebate = card.spendingBreakdown[category] * 0.003
            othersRebate += rebate
        }
    }
    if (othersRebate>25) {othersRebate = 25}

    return totalRebate + othersRebate
}

const posb = function(transactions) {
    
}

export const rebateFuncMap = {
    "OCBC 365 Credit Card" : ocbc365,
    "DBS Live Fresh Card" : dbsLiveFresh,
    "Maybank Family and Friends" : maybankFandF, //t&c updated, wrong calc now
    "Advance Credit Card" : hsbcAdvance,
    "Citi Cash Back®" : citiCashback,
    "POSB Everyday" : posb, //still doesnt work
    "FRANK Credit Card" : frank
}


// Test cases
const testTransactionList = [   {"category" : "dining", "amount" : -200},
                                {"category" : "others", "amount" : -30},
                                {"category" : "groceries", "amount" : -500},
                                {"category" : "petrol", "amount" : -100},
                                {"category" : "transport", "amount" : -1000}]

const testCategoryDining = [{"category" : "dining", "amount" : -10000}]
const testCategoryOthers = [{"category" : "others", "amount" : -10000}]
