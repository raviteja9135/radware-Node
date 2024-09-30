const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var bodyParser = require('body-parser')
var Schema = mongoose.Schema;

var jsonParser = bodyParser.json();

const app = express();
let corsOptions = {
    origin: ['http://localhost:3006' ]
};
app.options('*', cors())
app.get('/',(req,res) => {
    res.send('App running on 3000');
});

app.get('/login',(req,res) => {
    res.send('login triggered');
});

var users = mongoose.model('users', new Schema({ name: String}));
app.get('/products',cors(corsOptions), async (req,res) => {
    await users.find().then((collection) => {
        res.send(collection);
    })
});

app.post('/products',cors(corsOptions),jsonParser,async (req,res) => {
    
    await users.deleteOne({"_id": req.body.id});
    await users.find().then((collection) => {
        res.send(collection);
    })
});

app.post('/product-update',cors(corsOptions),jsonParser,async (req,res) => {
    
    await users.updateOne({"_id": req.body.id}, {$set: req.body}).then((response) => res.send(JSON.stringify(response)));
});

mongoose.connect('mongodb+srv://raviteja9135:Marty35@cluster1.yxcnv.mongodb.net/sample_mflix')
  .then(() =>   {
    console.log('Connected!');
    app.listen(3000, () => {
        console.log('app running in 3000');
    })
  } );
