
export const savrAlgo = async (amount, category, uid, data) => {
    const url = "http://127.0.0.1:8000/algo/"
    console.log(JSON.stringify({amount: amount, category: category}))
    try {
        console.log('sending', amount, category);
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                amount: amount, 
                category: "Online",
                data: data
            })
        })
        .then(response => {
            return response.text();
        }).then(text => {
            console.log(text);
        });
        return res;
    } catch (err) {
        console.error(err);
        return Error;
    }
}