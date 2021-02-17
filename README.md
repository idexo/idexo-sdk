# idexo-sdk

Idexo's multi-blockchain development SDK is the easiest way to create, deploy and manage applications for any blockchain. 

The SDK offers simplified methods that accomplish exactly what you are looking to do (i.e. leverage specific features) of different blockchains in your application.

For example, upload plain text permanently to the Arweave permaweb:

```javascript
const ido = require('idexo-sdk')

const plainText = 'Hello World'

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

### Documentation

[idexo docs](https://idexo.gitbook.io/docs)

### Website

[idexo.io](https://idexo.io)





