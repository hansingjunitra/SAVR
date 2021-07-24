
export const savrAlgo = async (spend, category, uid, data) => {
    const url = "http://192.168.86.31:80/algo/"+uid
    
    try {
        console.log('send to backend');
        const res = await fetch(url, {
            method: 'CALL',
            headers: {
                'Content-Type': "application/json",
                spend: spend,
                category: category
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.text();
        });
        console.log(res)
        return res;
    } catch (err) {
        console.error(err);
        return Error;
    }
}