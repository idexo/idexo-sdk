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

deployMarketplace(apiKey, network, tradingFee, marketType)

addNFTContract(apiKey, network, contractAddress, nftcontract)


### NFT

createCollectionCapped(apiKey, network, name, symbol, cap)

createCollectionUncapped(apiKey, network, name, symbol)

mintNFT(apiKey, network, contractAddress, addressToMintTo, tokenUri)

mintNFTBatch(apiKey, network, contractAddress, [recipients], [tokenURIs])

setTokenURI(apiKey, network, contractAddress, tokenId, tokenUri)

getTokenURI(apiKey, network, contractAddress, tokenId)


### Multi


mintNFTWithImage(apiKey, network, contractAddress, addressToMintTo, image, nftName, nftDescription, attributes, [imageIsBase64], [contentType])
| Parameter      | Datatype  | Description                                       |
| -------------- |:---------:| -------------------------------------------------:|
| image          | string    | image path OR base64 encoded image                |
| [imageIsBase64]| bool      | Default = false. optional if image is image path  |
| [contentType]  | string    | optional if image is image path. Ex. "image/jpeg" |



### Project Tokens

deployTokenCapped(apiKey, network, name, symbol, cap)

deployTokenSimple(apiKey, network, name, symbol)

mintToken(apiKey, network, contractAddress, mintToAddress, amount)

### Storage

uploadPlain(apiKey, network, data)

uploadHTML(apiKey, network, data)

uploadBuffer(apiKey, network, data, encoding)

uploadImage(apiKey, network, imagepath)

### Staking

deployPool(apiKey, network, name, symbol, baseUri, multi, depositTokens, rewardTokens)

### Vesting

deployVesting(apiKey, network, depositToken, beneficiary, startTime, cliffMonth, durationMonth)

depositInitial(apiKey, network, contractAddress, amount)

### Utils

getContractAddress(apiKey, network, transactionHash)

getTransactions(apiKey, network, timestampFrom, timestampTo)

getTransactionsByGroup(apiKey, network, group, timestampFrom, timestampTo)

## Available Networks

The following networks are currently supported:

* Arweave
* Avalanche
* BNBchain (fka Binance Smart Chain)
* Ethereum
* Fantom
* Polygon
* Solana


### Documentation

[idexo docs](https://docs.idexo.com)

### Website

[idexo.com](https://idexo.com)

### Token

[the $IDO token](https://token.idexo.io)
