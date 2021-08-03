import { getTransactions } from "../../saltedge";

const fetchTransactions = async (card, transactionList) => {
    // console.log(card.saltEdge.connectionID, card.saltEdge.accountID)
    const { saltEdge, id:cardID, card_name:cardName, saltedgeCategory, categories:cardCategoryList, totalSpent, spendingBreakdown } = card;
    let updatedTransactionList = [...transactionList];
    let updatedTotalSpent = totalSpent;
    let updatedSpendingBreakdown = spendingBreakdown;
    const today = new Date();
    try {
        let newestFetchedID = saltEdge.lastTransactionIDFetched;
        let lastFetchedID = null;
        while(true)  {
            let { fetchedTransactionList, lastFetchedID } = await getTransactions(saltEdge.connectionID, saltEdge.accountID, newestFetchedID)
            if (fetchedTransactionList === null ) {
                throw new Error ("Unable to fetch transaction list");
            }
            
            fetchedTransactionList.map(transaction => {
                if (transactionList.find(et => et.id == transaction.id) === undefined && transaction.amount < 0) { // et = existing transaction
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
                    // if ((today.getMonth() == transactionDate.getMonth() || today.getMonth() - 1 == transactionDate.getMonth()) && today.getFullYear() == transactionDate.getFullYear()) {
                    if ((( transactionDate.getMonth() == 6  && transactionDate.getDate() > 21) ||  transactionDate.getMonth() == 7) && today.getFullYear() == transactionDate.getFullYear()) { // for demo
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
}

export {
    fetchTransactions
}