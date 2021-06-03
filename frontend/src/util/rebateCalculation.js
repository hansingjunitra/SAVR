
const ocbc365 = function(card) {
    const rebateCategory = {"Dining":0.06, "Groceries":0.03 ,"Transport":0.03 ,"Petrol":0.05 ,"Utilities":0.03 ,"Travel":0.03, "Others":0.003}
    var totalRebate = 0;
    var totalSpend = card.totalSpent;

    for (const category in card.spendingBreakdown) {
        if (category in rebateCategory && totalSpend>=800) {
            var rebate = card.spendingBreakdown[category] * rebateCategory[category]
            totalRebate += rebate;
        }
        else {
            totalRebate = totalSpend * 0.003
        }
    }
    if (totalRebate>80) {totalRebate = 80}

    return totalRebate
}

const dbsLiveFresh = function(card) {
    const rebateCategory = {"Online":0.05, "Contactless":0.05, "Others":0.003};
    var totalRebate = 0;
    var totalSpend = card.totalSpent;

    for (const category in card.spendingBreakdown) {
        if (category in rebateCategory && totalSpend>=600) {
            var rebate = card.spendingBreakdown[category] * rebateCategory[category]
            if (rebate>20) {rebate = 20}
            totalRebate += rebate;
        }
        else {
            totalRebate = totalSpend * 0.003
        }
    }

    return totalRebate
}

const maybankFandF = function(card) {
    const rebateCategory = ["Food Delivery", "Fast Food", "Groceries", "Transport", "Petrol", "Learning/Retail", "Tele/Streaming"]
    var totalRebate = 0;
    var totalSpend = card.totalSpent;

    for (const category in card.spendingBreakdown) {
        if (category in rebateCategory) {
            if (totalRebate<80) {
                if (totalSpend>=800) {var rebate = card.spendingBreakdown[category] * 0.08}
                else if (totalSpend>=500) {var rebate = card.spendingBreakdown[category] * 0.05}
                else {var rebate = card.spendingBreakdown[category] * 0.003}
            }
            else {var rebate = card.spendingBreakdown[category] * 0.003}
            totalRebate += rebate;
        }
        else {
            totalRebate = totalSpend * 0.003
        }
    }
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

const citiCashback = function(card) {
    const rebateCategory = {"Dining":0.06, "Groceries":0.08, "Petrol":0.08, "Others":0.0025}
    var totalRebate = 0;
    var totalSpend = card.totalSpent;

    for (const category in card.spendingBreakdown) {
        if (category in rebateCategory && totalSpend>=800) {
            var rebate = card.spendingBreakdown[category] * rebateCategory[category]
            totalRebate += rebate;
        }
        else {
            totalRebate = totalSpend * 0.0025
        }
    }
    if (totalRebate>80) {totalRebate = 80}

    return totalRebate
}

const frank = function(card) {
    const rebateCategory = {"Online":0.06, "Contactless/Forex":0.06, "Others":0.003}
    var totalRebate = 0;
    var totalSpend = card.totalSpent;

    for (const category in card.spendingBreakdown) {
        if (category in rebateCategory && totalSpend>=600) {
            var rebate = card.spendingBreakdown[category] * rebateCategory[category]
            if (rebate>25) {rebate = 25}
            totalRebate += rebate;
        }
        else {
            totalRebate = totalSpend * 0.003
        }
    }

    return totalRebate
}

const posb = function(transactions) {
    
}

export const rebateFuncMap = {
    "OCBC 365 Credit Card" : ocbc365,
    "DBS Live Fresh Card" : dbsLiveFresh,
    "Maybank Family and Friends" : maybankFandF, //still doesnt work
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
