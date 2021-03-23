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
        console.log(res);
        return res['data']['id'];
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
            daily_refresh: true,
            consent: {
                from_date: "2021-03-01", //start of month YYYY--MM--DD
                scopes: [ "account_details", "transactions_details" ]
            },
            attempt: { 
                from_date: "2021-03-01", //one year?
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
        console.log(res);
        return res['data']['connect_url'];
    } catch (err) {
        console.error(err);
        return Error;
    }
}