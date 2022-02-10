# SeeDAO Address Gating Application

SeeDAO Address Gating NodeJs backend application is designed, developed, deployed and maintained by SeeDAO OpenSource Software Task Force. 

## Local Deploy
Clone the repo:

```bash
git clone git@github.com:seedao/address-gating.git
```

Install the dependency:

```bash
cd address-gating
npm install
```

Set up your .env file:

```bash
touch .env
```
Parse the follow into .env file:
```bash
MORALIS_KEY="ENTER YOUR OWN MORALIS KEY HERE" 
PORT=8080
CONTRACT_ADDR="0x23fDA8a873e9E46Dbe51c78754dddccFbC41CFE1"
```
Run the application:
```bash
node index.js
```

## API List

| API             | HTTP Method | Description                                                                                                                           | Example Url & Input                                                                                    | Example Output    |
|-----------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|-------------------|
| /validate?addr= | GET         | Check whether addr in query has a SeeDAO NFT. If does, a json file with `isOwner` variable with `true` boolean value will be returned | http://ec2-23-23-56-6.compute-1.amazonaws.com/validate?addr=0xd093add6c11cd7f2fcc2ecba93fa93cb2f54fbea | {"isOwner": true} |


## Contribution & BUIDL Together!

Just grab your keyboard, join SeeDAO and design / research / invest / write / code with us!

## Resources

[SeeDao Official Discord](https://discord.com/invite/4UmjBAG3pT)