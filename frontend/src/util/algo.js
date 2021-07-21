
export const savrAlgo = async (spend, category, uid) => {
    const url = "http://192.168.86.31:80/algo/"+uid
    
    try {
        console.log('sending');
        const res = await fetch(url, {
            method: 'TEST',
            headers: {
                'Content-Type': "application/json",
                spend: spend,
                category: category
            },
            body: JSON.stringify("test")
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