const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const cors=require("cors");

// TODO: implement the code with MongoDB 
// const mongoose = require('mongoose');

// load env config & init ENV varibles
require('dotenv').config()

const MORALIS_KEY = process.env.MORALIS_KEY
const PORT = process.env.PORT || 8080
const CONTRACT_ADDR = process.env.CONTRACT_ADDR

// init express object
const app = express()

// TODO: Figure it out how to use it
// app.use(cors);
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// init global variables
// let owners = {}
// TODO: fix this fixed value issue
let owners = require('./data/owner').result;
let ownerMap = new Map();

app.get('/validate', (req, res) => {

    let addr = req.query.addr;
    console.log("Addr", addr)
    // missing parameters
    if(!addr) {
        res.status(422);
        res.send('None shall pass');
    }
    res.status(200);
    if(ownerMap.has(addr)) {
        res.json({ isOwner: true });
    } else {
        res.json({ isOwner: false });
    }
})

app.get('/ping', (req, res) => {

    console.log("ping")
    res.send("PING")
})

function updateOwnerMap() {
    for (let owner of owners) {
        try {
            ownerMap.set(owner.owner_of, true)
        } catch(err) {
            console.log(err)
        }
    }
}

// TODO: 
function cronFetchOwner() {

}

app.listen(PORT, () => {
    console.log('[See DAO] address gating application online')
    updateOwnerMap()
})

