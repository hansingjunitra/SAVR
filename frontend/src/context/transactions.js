import { getTransactions } from "../saltedge";

const fetchTransactions = async (connectionID, accountID, transactionCard) => {
    console.log(connectionID, accountID)
    const {transactions, lastFetchedID} = await getTransactions(connectionID, accountID,  transactionCard.saltEdge.lastTransactionIDFetched );
    let parsedTransactions = []

    let updatedTransactionID = transactionCard.saltEdge.lastTransactionIDFetched;
    let updatedTotalSpent = transactionCard.totalSpent;
    let updatedSpendingBreakdown = transactionCard.spendingBreakdown;
    const today = new Date();

    for (let i = 0; i < transactions.length; i++) {
        // if transaction has not been fetched and is an expense
        if (updatedTransactionID < transactions[i].id && transactions[i].amount < 0) {
            const amount =  Math.abs(transactions[i].amount);
            const category = transactions[i].category in transactionCard.saltedgeCategory ? transactionCard.saltedgeCategory[transactions[i].category] : "Others"
            const transactionDate = new Date(transactions[i].made_on); 
            const icon = transactionCard.categories.find((c) => c.eligibility == category).icon;

            updatedTransactionID = transactions[i].id;

            // if the transaction is from the current month
            if (today.getMonth() == transactionDate.getMonth() && today.getFullYear() == transactionDate.getFullYear()) {
                updatedTotalSpent += amount
                updatedSpendingBreakdown[category] += amount
            }
            
            parsedTransactions.push(
                {
                    id: transactions[i].id,
                    cardID: transactionCard.id,
                    cardName: transactionCard.card_name,
                    amount: amount,
                    category: category,
                    description: transactions[i].description,
                    date:   transactions[i].made_on,
                    merchant: transactions[i].extra.merchant_id,
                    icon: icon,
                    alias: null
                }
            )
        }
    }
            
    let updatedTransactionList = [...transactionList, ...parsedTransactions]
    let updatedCardList = cardList;

    const cardIndex = updatedCardList.findIndex((card) => card.id == transactionCard.id);
    
    // update card information
    updatedCardList[cardIndex].saltEdge.lastTransactionIDFetched = updatedTransactionID;
    updatedCardList[cardIndex].totalSpent = updatedTotalSpent;

    // setTransactionList(updatedTransactionList);
    // AsyncStorage.setItem('transactionHistory', JSON.stringify([...updatedTransactionList]));
    // setCardList(updatedCardList);
    // AsyncStorage.setItem('creditCardRecord', JSON.stringify([...updatedCardList]));
    console.log(updatedTransactionID, updatedCardList)
    return updatedTransactionList, updatedCardList
}

export {
    fetchTransactions
}