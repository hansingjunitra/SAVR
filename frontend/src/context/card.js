import { getConnectionAccounts } from "../saltedge";

const getCardConnectionAccount = async (connectionList, card) => {
    const FAIL_RESPONSE = {
        iBankingSync: false,
        connectionID: null,
        accountID: null,
        lastTransactionIDFetched: null
    }

    try {
        if (card === null) {
            throw new Error ("null card when getting card connection account");
        }
        const connection = connectionList.find(c => c.bank == card.bank);    
        if (connection === undefined) { // Card not found
            return FAIL_RESPONSE;
        } 
        const res = await getConnectionAccounts(connection.id);
        if ('error' in res) {
            throw new Error ("Error when getting connection accounts from saltedge");
        }
        const accountList = res.data;
        const account = accountList.find(a => a.extra.account_name == card.card_name);
        if (account === undefined) {
            return {
                iBankingSync: true,
                connectionID: connection.id,
                accountID: null,
                lastTransactionIDFetched: null
            }
        }
        return {
            connectionID : account.connection_id,
            accountID : account.id,
            iBankingSync : true,
            lastFetchedTransaction : null
        }
        
    } catch (err) {
        console.error(err)
        return FAIL_RESPONSE;
    }
}

export {
    getCardConnectionAccount
}