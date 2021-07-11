
export const savrAlgo = async (transactions) => {
    const url = "http://192.168.86.31:80/algo/"
    
    try {
        console.log('sending');
        const res = await fetch(url)
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