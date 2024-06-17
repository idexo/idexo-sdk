# idexo-sdk

Idexo's multi-blockchain development SDK is the easiest way to create, deploy and manage applications for any blockchain.

The SDK offers simplified methods that accomplish exactly what you are looking to do (i.e. leverage specific features) of different blockchains in your application.

For example, creating a Royalty NFT collection that is capped to 100 NFTs to be deployed on your preferred blockchain network:

```javascript
const ido = require("idexo-sdk")

ido.NFTs.createCappedRoyalty(apiKey, networkName, NFTCollectionName, NFTCollectionSymbol, 
RoyaltyCollectorWalletAddress, RoyaltyBasisPoints, 100) //100 is Cap value
.then((res) => console.log(res.data))
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

To use these methods you need credits that you can obtain in the idexo dashboard at https://app.idexo.io/register. 

For information on how to purchase and use transaction and method credits with this SDK, see https://docs.idexo.com/master. 

Find your API key under Account -> API. 

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

mintNFT(apiKey, network, contractAddress, mintToAddress, tokenUri)

mintRoyaltyNFT(apiKey, network, contractAddress, mintToAddress, tokenUri)

mintNFTBatch(apiKey, network, contractAddress, [recipients], [tokenURIs])

setTokenURI(apiKey, network, contractAddress, tokenId, tokenUri)

getTokenURI(apiKey, network, contractAddress, tokenId)

getCollectionIds(apiKey, network, contractAddress, walletAddress, withURI = false)

getBalanceOf(apiKey, network, contractAddress, walletAddress)


### SBT

createSBTCapped(apiKey, network, name, symbol, baseUri, cap, options)

createSBTUncapped(apiKey, network, name, symbol, baseUri, options)

createLinkedSBTUncapped(apiKey, network, name, symbol, baseUri, options)

mintSBT(apiKey, network, contractAddress, mintToAddress, tokenUri)


### Multi


mintNFTWithImage(apiKey, network, contractAddress, mintToAddress, image, nftName, nftDescription, attributes, [options])
| Parameter      | Datatype  | Description                                                                                   |
| -------------- |:---------:| ---------------------------------------------------------------------------------------------:|
| image          | string    | 1) image file path, 2) URL, OR, 3) base64 string                                              |
| attributes     | json      | must be an array. Example: [ { "trait_type": "color", "value": "blue" } ]                     |
| [options]      | object    | optional. set metadata storage option (default "arweave"). ex. { metadataStorage: "filecoin" }|


### Tokens

createTokenCapped(apiKey, network, name, symbol, cap, options)

createTokenUncapped(apiKey, network, name, symbol)

mintToken(apiKey, network, contractAddress, mintToAddress, amount)

### Storage

uploadPlain(apiKey, network, data)

uploadHTML(apiKey, network, data)

uploadJSON(apiKey, network, data)

uploadBuffer(apiKey, network, data, encoding)

uploadImage(apiKey, network, imagePath)

uploadNFTMetadata(apiKey, network, image, nftName, nftDescription, attributes, [options])
| Parameter      | Datatype  | Description                                                                                   |
| -------------- |:---------:| ---------------------------------------------------------------------------------------------:|
| image          | string    | 1) image file path, 2) URL, OR, 3) base64 string                                              |
| attributes     | json      | must be an array. Example: [ { "trait_type": "color", "value": "blue" } ]                     |
| [options]      | object    | optional. set metadata storage option (default "arweave"). ex. { metadataStorage: "filecoin" }|


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

The following mainnet networks are currently supported [values to set for network in brackets]:

* Arbitrum [arbitrum]
* Arbitrum Nova [arbitrumnova]
* Arweave [arweave]
* Ethereum [etherum]
* Fantom [fantom]
* Filecoin [filecoin]
* Mantle [mantle]
* Optimism [optimism]
* Polygon [polygon]
* zkSync [zksync]

The following testnet networks are currently supporded: 

* zkSync Sepolia Testnet [zksynctest]


### Documentation

[idexo docs](https://docs.idexo.com)

### Website

[idexo.com](https://idexo.com)

### Token

[the $IDO token](https://token.idexo.io)
