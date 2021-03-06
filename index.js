const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path =  require('path');
const authentication = require('./routes/authentication')(router);

const bodyParser = require('body-parser');  


mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err)=>{
    if(err){
        console.log('Could not conenct to database: '+err);
    }else{
        console.log('Connected to database: '+config.db);
    }
});

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use(express.static(__dirname+'/client/dist/'));
app.use('/authentication',authentication);
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname+'/client/dist/index.html'));
});

app.listen(8080,()=>{
    console.log('Listening on port 8080');
});