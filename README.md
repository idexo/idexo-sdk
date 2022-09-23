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

createSimpleMarketplace(apiKey, network, purchaseToken, saleStartTime, options)

createAuctionMarketplace(apiKey, network, purchaseToken, maxDuration, options)


### NFT

createCollectionCapped(apiKey, network, name, symbol, cap, options)

createCollectionUncapped(apiKey, network, name, symbol)

createCappedRoyalty(apiKey, network, name, symbol, royaltyCollector, royaltyBP, cap, options)

createUncappedRoyalty(apiKey, network, name, symbol, royaltyCollector, royaltyBP, options)

mintNFT(apiKey, network, contractAddress, addressToMintTo, tokenUri)

mintRoyaltyNFT(apiKey, network, contractAddress, mintToAddress, tokenUri)

mintNFTBatch(apiKey, network, contractAddress, [recipients], [tokenURIs])

setTokenURI(apiKey, network, contractAddress, tokenId, tokenUri)

getTokenURI(apiKey, network, contractAddress, tokenId)

getCollectionIds(apiKey, network, contractAddress, walletAddress, withURI = false)

getBalanceOf(apiKey, network, contractAddress, walletAddress)


### SBT

createSBTCapped(apiKey, network, name, symbol, baseUri, cap, options)

createSBTUncapped(apiKey, network, name, symbol, baseUri, options)

mintSBT(apiKey, network, contractAddress, mintToAddress, tokenUri)


### Multi


mintNFTWithImage(apiKey, network, contractAddress, addressToMintTo, image, nftName, nftDescription, attributes, [imageIsBase64], [contentType])
| Parameter      | Datatype  | Description                                       |
| -------------- |:---------:| -------------------------------------------------:|
| image          | string    | image path OR base64 encoded image                |
| [imageIsBase64]| bool      | Default = false. optional if image is image path  |
| [contentType]  | string    | optional if image is image path. Ex. "image/jpeg" |


### Tokens

createTokenCapped(apiKey, network, name, symbol, cap, options)

createTokenUncapped(apiKey, network, name, symbol)

mintToken(apiKey, network, contractAddress, mintToAddress, amount)

### Storage

uploadPlain(apiKey, network, data)

uploadHTML(apiKey, network, data)

uploadBuffer(apiKey, network, data, encoding)

uploadImage(apiKey, network, imagePath)

uploadNFTMetadata(apiKey, network, image, nftName, nftDescription, attributes, [imageIsBase64], [contentType])
| Parameter      | Datatype  | Description                                       |
| -------------- |:---------:| -------------------------------------------------:|
| image          | string    | image path OR base64 encoded image                |
| [imageIsBase64]| bool      | Default = false. optional if image is image path  |
| [contentType]  | string    | optional if image is image path. Ex. "image/jpeg" |


### Vesting

createVesting(apiKey, network, depositToken, beneficiary, startTime, cliffDays, durationDays, claimsPeriod, options)

depositInitial(apiKey, network, contractAddress, amount)

getVestedAmount(apiKey, network, contractAddress)

getAvailableClaimAmount(apiKey, network, contractAddress)


### Utils

getContractAddress(apiKey, network, transactionHash)

getTransactions(apiKey, network, timestampFrom, timestampTo)

getTransactionsByGroup(apiKey, network, group, timestampFrom, timestampTo)

getTransactionsByFunction(apiKey, function_name)

## Available Networks

The following networks are currently supported:

* Arweave
* Avalanche
* BNBchain (fka Binance Smart Chain)
* Dogechain
* Ethereum
* Fantom
* Filecoin
* Polygon
* Solana


### Documentation

[idexo docs](https://docs.idexo.com)

### Website

[idexo.com](https://idexo.com)

### Token

[the $IDO token](https://token.idexo.io)
