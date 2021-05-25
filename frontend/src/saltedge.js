const apiKey = require('./apikey.json')

export const createSaltEdgeCustomer = async (name, token) => {
    const url = "https://www.saltedge.com/api/v5/customers"
    const data = {
        data: {
            identifier: name + '-' + token
        }
    }
    try {
        const res = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "App-id": apiKey['App-id'],
                "Secret": apiKey['Secret']
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then(response => {
            return response.json();
        });
        return [res['data']['id'], res['data']['secret']];
    } catch (err) {
        console.error(err);
        return Error;
    }
}

export const createConnection = async (customerID, bank) => {
    const url = "https://www.saltedge.com/api/v5/connect_sessions/create"
    const data = {
        data: {
            customer_id: customerID,
            country_code: "SG", 
            provider_code: bank,
            consent: {
                from_date: "2021-03-01", //start of month YYYY--MM--DD
                scopes: [ "account_details", "transactions_details" ],
                daily_refresh: true,
            },
            attempt: { 
                from_date: "2021-03-01", //one year?
                return_to: "savr://home",
                fetch_scopes: [ "accounts", "transactions" ],
                custom_fields: {
                    test: true
                }
            },
        }
    }
    try {
        const res = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "App-id": apiKey['App-id'],
                "Secret": apiKey['Secret']
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then(response => {
            return response.json();
        });
        //console.log(res);
        return res['data']['connect_url'];
    } catch (err) {
        console.error(err);
        return Error;
    }
}

export const getCustomerConnections = async (customerID) => {
    const url = `https://www.saltedge.com/api/v5/connections?customer_id=${customerID}`
    try {
        const res = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "App-id": apiKey['App-id'],
                "Secret": apiKey['Secret']
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }).then(response => {
            return response.json();
        });
        return res['data'];
    } catch (err) {
        console.error(err);
        return Error;
    }
}

export const getConnectionAccounts = async (connectionID) => {
    const url = `https://www.saltedge.com/api/v5/accounts?connection_id=${connectionID}`
    try {
        const res = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "App-id": apiKey['App-id'],
                "Secret": apiKey['Secret']
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }).then(response => {
            return response.json();
        });
        return res;
        // return res['data'];
    } catch (err) {
        console.error(err);
        return Error;
    }
}

export const getTransactions = async (connectionID, accountID) => {
    const url = `https://www.saltedge.com/api/v5/transactions?connection_id=${connectionID}&account_id=${accountID}`
    try {
        const res = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "App-id": apiKey['App-id'],
                "Secret": apiKey['Secret']
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }).then(response => {
            return response.json();
        });
        return res['data'];
    } catch (err) {
        console.error(err);
        return Error;
    }
}