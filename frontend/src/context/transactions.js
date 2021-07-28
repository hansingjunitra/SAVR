import { getTransactions } from "../saltedge";

const fetchTransactions = async (card, transactionList) => {
    // console.log(card.saltEdge.connectionID, card.saltEdge.accountID)
    const { saltEdge, id:cardID, card_name:cardName, saltedgeCategory, categories:cardCategoryList, totalSpent, spendingBreakdown } = card;
    let updatedTransactionList = [...transactionList];
    let updatedTotalSpent = totalSpent;
    let updatedSpendingBreakdown = spendingBreakdown;
    const today = new Date();
    console.log(cardCategoryList);
    try {
        let newestFetchedID = saltEdge.lastTransactionIDFetched;
        let lastFetchedID = null;
        while(true)  {
            console.log("Execute")
            let { fetchedTransactionList, lastFetchedID } = await getTransactions(saltEdge.connectionID, saltEdge.accountID, newestFetchedID)
            if (fetchedTransactionList === null ) {
                throw new Error ("Unable to fetch transaction list");
            }
            
            fetchedTransactionList.map(transaction => {
                if (transactionList.find(et => et.id == transaction.id) === undefined && transaction.amount < 0) { // et = existing transaction
                    // console.log("Exec")
                    let transactionCategory = transaction.category in saltedgeCategory ? saltedgeCategory[transaction.category] : "Others"
                    let t = {
                        id: transaction.id,
                        cardID: cardID,
                        cardName: cardName,
                        amount:  Math.abs(transaction.amount),
                        category: transaction.category in saltedgeCategory ? saltedgeCategory[transaction.category] : "Others",
                        description: transaction.description,
                        date:   transaction.made_on,
                        merchant: transaction.extra.merchant_id,
                        icon: cardCategoryList.find((c) => c.eligibility == transactionCategory).icon,
                        alias: null
                    }
    
                    const transactionDate = new Date(transaction.made_on); 
                    if (today.getMonth() == transactionDate.getMonth() && today.getFullYear() == transactionDate.getFullYear()) {
                        updatedTotalSpent += parseFloat(t['amount'].toFixed(2))
                        updatedSpendingBreakdown[`${t["category"]}`] += parseFloat(t['amount'].toFixed(2))
                    }
                    updatedTransactionList.unshift(t);
                }
            })
            if (fetchedTransactionList.length != 0){
                newestFetchedID = fetchedTransactionList[fetchedTransactionList.length -1].id
            }
            if (lastFetchedID == null) {
                break;
            }
        } 
        return {updatedCard: {
                    ...card, 
                    spendingBreakdown: updatedSpendingBreakdown, 
                    totalSpent: updatedTotalSpent,
                    saltEdge: {
                        ...card.saltEdge,
                        lastTransactionIDFetched: newestFetchedID
                    }
                },  updatedTransactionList:  updatedTransactionList}
    } catch (err) {
        console.error(err);
        console.log("Error")
        return {updatedCard: card, updatedTransactionList: transactionList}
    }

    // const {transactions, lastFetchedID} = await getTransactions(connectionID, accountID,  card.saltEdge.lastTransactionIDFetched );
    // let parsedTransactions = []

    // let updatedTransactionID = card.saltEdge.lastTransactionIDFetched;
    // let updatedTotalSpent = card.totalSpent;
    // let updatedSpendingBreakdown = card.spendingBreakdown;
    // const today = new Date();

    // for (let i = 0; i < transactions.length; i++) {
    //     // if transaction has not been fetched and is an expense
    //     if (updatedTransactionID < transactions[i].id && transactions[i].amount < 0) {
    //         const amount =  Math.abs(transactions[i].amount);
    //         const category = transactions[i].category in card.saltedgeCategory ? card.saltedgeCategory[transactions[i].category] : "Others"
    //         const transactionDate = new Date(transactions[i].made_on); 
    //         const icon = card.categories.find((c) => c.eligibility == category).icon;

    //         updatedTransactionID = transactions[i].id;

    //         // if the transaction is from the current month
    //         if (today.getMonth() == transactionDate.getMonth() && today.getFullYear() == transactionDate.getFullYear()) {
    //             updatedTotalSpent += amount
    //             updatedSpendingBreakdown[category] += amount
    //         }
            
    //         parsedTransactions.push(
    //             {
    //                 id: transactions[i].id,
    //                 cardID: card.id,
    //                 cardName: card.card_name,
    //                 amount: amount,
    //                 category: category,
    //                 description: transactions[i].description,
    //                 date:   transactions[i].made_on,
    //                 merchant: transactions[i].extra.merchant_id,
    //                 icon: icon,
    //                 alias: null
    //             }
    //         )
    //     }
    // }
            
    // let updatedTransactionList = [...transactionList, ...parsedTransactions]
    // let updatedCardList = cardList;

    // const cardIndex = updatedCardList.findIndex((card) => card.id == card.id);
    
    // // update card information
    // updatedCardList[cardIndex].saltEdge.lastTransactionIDFetched = updatedTransactionID;
    // updatedCardList[cardIndex].totalSpent = updatedTotalSpent;

    // // setTransactionList(updatedTransactionList);
    // // AsyncStorage.setItem('transactionHistory', JSON.stringify([...updatedTransactionList]));
    // // setCardList(updatedCardList);
    // // AsyncStorage.setItem('creditCardRecord', JSON.stringify([...updatedCardList]));
    // console.log(updatedTransactionID, updatedCardList)
    // return updatedTransactionList, updatedCardList
}

export {
    fetchTransactions
}