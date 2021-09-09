# idexo-sdk

Idexo's multi-blockchain development SDK is the easiest way to create, deploy and manage applications for any blockchain.

The SDK offers simplified methods that accomplish exactly what you are looking to do (i.e. leverage specific features) of different blockchains in your application.

For example, upload plain text permanently to the Arweave permaweb:

```javascript
const ido = require("idexo-sdk")

const plainText = "Hello World"

ido.Arweave.uploadPlain(plainText).then(console.log)
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

Methods below are categorized by the blockchain they target.

### Arweave

uploadPlain(plainText)

uploadBuffer(data, encoding)

uploadHTML(html)

uploadImage(imagepath)

### Avalanche

#### SimpleNFT

deploySimpleNFT(name, symbol, apiKey)

mintSimpleNFT(contractAddress, addressToMintTo, tokenUri, apiKey)

mintSimpleBatchNFT(contractAddress, [recipients], [tokenURIs], apiKey)

setSimpleTokenURI(contractAddress, tokenId, tokenUri, apiKey)

getSimpleTokenURI(contractAddress, tokenId, apiKey)

#### CappedNFT

deployCappedNFT(name, symbol, cap, apiKey)

mintCappedNFT(contractAddress, addressToMintTo, tokenUri, apiKey)

mintCappedBatchNFT(contractAddress, [recipients], [tokenURIs], apiKey)

setCappedTokenURI(contractAddress, tokenId, tokenUri, apiKey)

getCappedTokenURI(contractAddress, tokenId, apiKey)

### Binance Smart Chain

deployBEP20(name, symbol, apiKey)

deployBEP721(name, symbol, apiKey)

mintBEP721(contractAddress, mintToAddress, tokenUri, apiKey)

### Ethereum

deployERC20(name, symbol)

### Documentation

[idexo docs](https://idexo.gitbook.io/docs)

### Website

[idexo.io](https://idexo.io)
