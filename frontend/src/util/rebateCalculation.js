
const ocbc365 = function(transactions) {
    const rebateCategory = {"dining":0.06, "groceries":0.03 ,"transport":0.03 ,"petrol":0.05 ,"utilities":0.03 ,"onlinetravel":0.03, "excluded":0}
    var totalRebate = 0;
    var totalSpend = 0;

    for (var i=0; i<transactions.length; i++) {totalSpend += transactions[i].amount * -1}

    for (var i=0; i<transactions.length; i++) {
        if (transactions[i].category in rebateCategory && totalSpend>=800) {
            var rebate = transactions[i].amount * rebateCategory[transactions[i].category] * -1
            totalRebate += rebate;
        }
        else {
            var rebate = transactions[i].amount * 0.003 * -1
            totalRebate += rebate;
        }
    }
    if (totalRebate>80) {totalRebate = 80}

    return totalRebate, totalSpend
}

const dbsLiveFresh = function(transactions) {
    var onlineRebate = 0;
    var contactlessRebate = 0;
    var otherRebate = 0;
    var totalSpend = 0;

    for (var i=0; i<transactions.length; i++) {totalSpend += transactions[i].amount * -1}

    for (var i=0; i<transactions.length; i++) {
        if (transactions[i].category == "online" && totalSpend>=600) {
            var rebate = transactions[i].amount * 0.05 * -1
            onlineRebate += rebate;
        }
        else if (transactions[i].category == "contactless" && totalSpend>=600) {
            var rebate = transactions[i].amount * 0.05 * -1
            contactlessRebate += rebate;
        }
        else {
            var rebate = transactions[i].amount * 0.003 * -1
            otherRebate += rebate;
        }
    }
    if (onlineRebate>20) {onlineRebate = 20;}
    if (contactlessRebate>20) {contactlessRebate = 20;}
    if (otherRebate>20) {otherRebate = 20;}
    return onlineRebate+contactlessRebate+otherRebate, totalSpend
}

const maybankFandF = function(transactions) {
    const rebateCategory = ["food delivery", "fast food", "groceries", "transport", "petrol", "learning/retail", "tele/streaming"]
    var totalRebate = 0;
    var totalSpend = 0;

    for (var i=0; i<transactions.length; i++) {totalSpend += transactions[i].amount * -1}

    for (var i=0; i<transactions.length; i++) {
        if (transactions[i].category in rebateCategory) {
            if (totalSpend>=800) {var rebate = transactions[i].amount * 0.08 * -1}
            else if (totalSpend>=500) {var rebate = transactions[i].amount * 0.05 * -1}
            totalRebate += rebate;
        }
        else {
            var rebate = transactions[i].amount * 0.003 * -1
            totalRebate += rebate;
        }
    }
    if (totalRebate<80) {
        return totalRebate
    }
    else {
        return 80
    }
}

const hsbcAdvance = function(transactions, deposit) {
    var totalSpend = 0;

    for (var i=0; i<transactions.length; i++) {totalSpend += transactions[i].amount * -1}

    if (totalSpend>2000) {var rebate = totalSpend * 0.025}
    else {var rebate = totalSpend * 0.015}
    if (rebate>70) {rebate = 70}

    if (deposit) {
        var additionalRebate = totalSpend * 0.01
        if (additionalRebate>300) {additionalRebate = 300}
        return rebate+additionalRebate
    }
    else {
        return rebate
    }
}

const citi = function(transactions) {
    const rebateCategory = {"dining":0.06, "groceries":0.08, "petrol":0.08, "others":0.0025}
    var totalRebate = 0;
    var totalSpend = 0;

    for (var i=0; i<transactions.length; i++) {totalSpend += transactions[i].amount * -1}

    for (var i=0; i<transactions.length; i++) {
        if (transactions[i].category in rebateCategory && totalSpend>=800) {
            var rebate = transactions[i].amount * rebateCategory[transactions[i].category] * -1
            totalRebate += rebate;
        }
        else {
            var rebate = transactions[i].amount * 0.003 * -1
            totalRebate += rebate;
        }
    }
    if (totalRebate>80) {totalRebate = 80}

    return totalRebate, totalSpend
}

const frank = function(transactions) {
    var onlineRebate = 0;
    var contactlessRebate = 0;
    var otherRebate = 0;
    var totalSpend = 0;

    for (var i=0; i<transactions.length; i++) {totalSpend += transactions[i].amount * -1}

    for (var i=0; i<transactions.length; i++) {
        if (transactions[i].category == "online" && totalSpend>=600) {
            var rebate = transactions[i].amount * 0.06 * -1
            onlineRebate += rebate;
        }
        else if ((transactions[i].category == "contactless" || transactions[i].category == "forex") && totalSpend>=600) {
            var rebate = transactions[i].amount * 0.06 * -1
            contactlessRebate += rebate;
        }
        else {
            var rebate = transactions[i].amount * 0.003 * -1
            otherRebate += rebate;
        }
    }
    if (onlineRebate>25) {onlineRebate = 25;}
    if (contactlessRebate>25) {contactlessRebate = 25;}
    if (otherRebate>25) {otherRebate = 25;}
    return onlineRebate+contactlessRebate+otherRebate, totalSpend
}

const posb = function(transactions) {
    
}

const test = function() {
    return 'test'
}

export const rebateFuncMap = {
    "OCBC 365 Credit Card" : ocbc365,
    "DBS Live Fresh Card" : dbsLiveFresh,
    "Maybank Family and Friends" : maybankFandF,
    "Advance Credit Card" : hsbcAdvance,
    "Citi Cash Back®" : citi,
    "POSB Everyday" : posb,
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

rebate, totalspend = ocbc365(testTransactionList)
console.log("test")