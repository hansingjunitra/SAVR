const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mc = require('mongodb').MongoClient;
const assert = require('assert');

const PORT = 3000

// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
var db = 'SAVR';

mc.connect(url, (err, client) => {
    try {
        db = client.db('SAVR');
        console.log("Connected successfully to server");
    } catch (err) {
        console.error(err)
    }
})

app.use((req, res, next) => {
    req.db = db;
    next();
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
    var collection = db.collection('users');
    var data = collection.findOne({'username':'johndoe'}, (err, item) => {
        console.log(item)
    })
})

app.listen(PORT, () => {
    console.log('Example app listening')
})