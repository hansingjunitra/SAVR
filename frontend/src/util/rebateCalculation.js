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

const test = function() {
    return 'test'
}

export const rebateFuncMap = {
    "ocbc365" : ocbc365,
    "dbsLiveFresh" : dbsLiveFresh,
    "maybankFandF" : maybankFandF,
    "hsbcAdvance" : hsbcAdvance,
    "test" : test
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