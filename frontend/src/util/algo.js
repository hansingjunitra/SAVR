
// export const savrAlgo = async (amount, category, uid, data) => {
//     const url = "http://127.0.0.1:8000/algo/"
//     console.log(JSON.stringify({amount: amount, category: category}))
//     try {
//         console.log('sending', amount, category);
//         const res = await fetch(url, {
//             method: 'POST',
export const savrAlgo = async (spend, category, uid, data) => {
    const url = "http://192.168.86.31:80/algo/"+uid
    
    try {
        console.log('send to backend');
        const res = await fetch(url, {
            method: 'CALL',
            headers: {
                'Content-Type': "application/json",
            },
            // body: JSON.stringify({
            //     amount: amount, 
            //     category: "Online",
            //     data: data
            // })
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