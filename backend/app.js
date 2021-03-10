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

// var creditCards =  require('./creditCards.json');

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

app.get('/', (req, res) => {
    // res.send(JSON.stringify({'Nothing Here'}))
})

app.get('/creditcards', (req, res) => {
    db.collection('cards').find({}).toArray(function (err, docs) {
        if (err) {
            return res.status(500).send({error: err})
        }
        res.send(docs)
    })
})

app.listen(PORT, () => {
    console.log('SAVR Backend Listening')
})