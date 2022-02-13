const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const url = require("url");
const querystring = require("querystring");
const cronJob = require("cron").CronJob;
const cors = require("cors");

// TODO: implement the code with MongoDB
// const mongoose = require('mongoose');

// load env config & init ENV varibles
require("dotenv").config();

const MORALIS_KEY = process.env.MORALIS_KEY;
const PORT = process.env.PORT || 8080;
const CONTRACT_ADDR = process.env.CONTRACT_ADDR;

// init express object
const app = express();

// TODO: Figure it out how to use it
// app.use(cors);
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// init global variables
let owners = {};
let ownerMap = new Map();

app.get("/validate", (req, res) => {
  let addr = req.query.addr;
  // missing parameters
  if (!addr) {
    res.status(422);
    res.send("None shall pass");
  }
  // switch to lower case
  addr = addr.toLowerCase();
  res.status(200);
  if (ownerMap.has(addr)) {
    res.json({ isOwner: true });
  } else {
    res.json({ isOwner: false });
  }
});

app.get("/ping", (req, res) => {
  console.log("ping");
  res.send("PING");
});

function updateOwnerMap() {
  ownerMap.clear();
  for (let owner of owners) {
    try {
      ownerMap.set(owner.owner_of, true);
    } catch (err) {
      console.log(err);
    }
  }
}

async function fetchFromMoralis() {
  const str = `https://deep-index.moralis.io/api/v2/nft/${CONTRACT_ADDR}/owners?chain=eth&format=decimal`;
  // Fix: we have to put X-API-Key in Axios default header setting
  // Refer to this article: https://stackoverflow.com/questions/60667416/put-api-key-in-axios
  axios.defaults.headers.common = {
    "X-API-Key": MORALIS_KEY,
  };
  const result = axios
    .get(str, {
      Headers: {
        'accept': 'application/json',
      }
    })
    .then((res) => {
      return [res.data.result, null];
    })
    .catch((err) => {
      console.error(err);
      return [null, err];
    });
  return result;
}

function cronFetchOwner() {
  // initialization of ownerMap
  owners = require("./data/owner").result;
  updateOwnerMap();

  // fetch from the Moralis API periodically
  // 10 mins per call
  var fetchingJob = new cronJob(
    "*/10 * * * *", 
    async () => {
    const ret = await fetchFromMoralis();
      if(ret[1]) {
        console.log('Errors when updating from Moralis')
      } else {
        owners = ret[0]
        updateOwnerMap();
        console.log('Update owner list successfully');
      }
    });
  fetchingJob.start();
}

app.listen(PORT, () => {
  console.log("[See DAO] address gating application online");
  cronFetchOwner();
});
