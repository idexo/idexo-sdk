# idexo-sdk

Idexo's multi-blockchain development SDK is the easiest way to create, deploy and manage applications for any blockchain.

The SDK offers simplified methods that accomplish exactly what you are looking to do (i.e. leverage specific features) of different blockchains in your application.

For example, upload plain text permanently to the Arweave permaweb:

```javascript
const ido = require("idexo-sdk")

const plainText = "Hello World"

ido.Storage.uploadPlain('arweave', plainText).then(res => console.log(res.data))
```

## Installing

Using npm:

```bash
$ npm install idexo-sdk
```

Using yarn:

```
$ yarn add idexo-sdk
```

## Available Methods

Methods below are categorized by the general use case.

### Marketplace

deployMarketplace(network, tradingFee, marketType, apiKey)

addNFTContract(network, contractAddress, nftcontract, apiKey)


### NFT

createCollection(network, name, symbol, capped, apiKey, cap)

mintNFT(network, contractAddress, addressToMintTo, tokenUri, apiKey)

mintNFTBatch(network, contractAddress, [recipients], [tokenURIs], apiKey)

setTokenURI(network, contractAddress, tokenId, tokenUri, apiKey)

getTokenURI(network, contractAddress, tokenId, apiKey)


### Multi

mintNFTWithImage(network, contractAddress, addressToMintTo, imagepath, nftName, nftDescription, apiKey, attributes)


### Project Tokens

deployToken(network, name, symbol, capped, apiKey, cap)

mintToken(network, contractAddress, mintToAddress, amount, apiKey)

### Storage

uploadPlain(network, data)

uploadHTML(network, data)

uploadBuffer(network, data, encoding)

uploadImage(network, imagepath)

### Staking

deployPool(network, name, symbol, baseUri, multi, depositTokens, rewardTokens, apiKey)

### Vesting

deployVesting(network, depositToken, beneficiary, startTime, cliffMonth, durationMonth, apiKey)

## Available Networks

The following networks are currently supported: 

* Arweave
* Avalanche
* BNBchain
* Ethereum
* Fantom
* Polygon


### Documentation

[idexo docs](https://docs.idexo.com)

### Website

[idexo.com](https://idexo.com)
