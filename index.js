const axios = require("axios")
const fs = require("fs").promises
const mime = require("mime")

const arweavePostUrl = "https://nigxx0onpl.execute-api.us-east-1.amazonaws.com/default/post-arweave"
const ethereumPostUrl = "https://nigxx0onpl.execute-api.us-east-1.amazonaws.com/default/post-eth"
const ethPostUrlOne = "https://mainneteth.idexo.io"
const multiPostUrl = "https://multiclass.idexo.io"
const bscPostUrl = "https://idexobsc.idexo.io"
const bscPostUrlOne = "https://mainnetbsc.idexo.io"
const polygonPostUrl = "https://polygon.idexo.io"
const reactPostUrl = "https://react.idexo.io"

function headers(apiKey) {
    return {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        }
    }
}

const IdexoSDK = {
    Arweave: {
        async uploadPlain(data) {
            const uploadType = "plainText"

            let transaction = await axios.post(
                arweavePostUrl,
                JSON.stringify({ uploadType: uploadType, data: data, encoding: "null" })
            )
            return transaction
        },
        async uploadHTML(data) {
            const uploadType = "HTML"

            let transaction = await axios.post(
                arweavePostUrl,
                JSON.stringify({ uploadType: uploadType, data: data, encoding: "null" })
            )
            return transaction
        },
        async uploadBuffer(data, encoding) {
            //data must be string (should enforce that with type)
            const uploadType = "buffer"

            let transaction = await axios.post(
                arweavePostUrl,
                JSON.stringify({ uploadType: uploadType, data: data, encoding: encoding })
            )
            return transaction
        },
        async uploadImage(imagepath) {
            //data must be string (should enforce that with type)
            const uploadType = "image"
            const contentType = mime.getType(imagepath)
            const image = await fs.readFile(imagepath, { encoding: "base64" })

            let transaction = await axios.post(
                arweavePostUrl,
                JSON.stringify({ uploadType: uploadType, image: image, contentType: contentType })
            )
            return transaction
        }
    },

    Binance: {
        async deployBEP20(name, symbol, apiKey) {
            const transactionType = "deployBEP20Standard"

            let transaction = await axios.post(
                bscPostUrlOne,
                JSON.stringify({ transactionType: transactionType, name: name, symbol: symbol }),
                headers(apiKey)
            )
            return transaction
        },
        async deployBEP20Test(name, symbol, apiKey) {
            const transactionType = "createBEP20"

            let transaction = await axios.post(
                bscPostUrl,
                JSON.stringify({ transactionType: transactionType, name: name, symbol: symbol }),
                headers(apiKey)
            )
            return transaction
        },
        async deployBEP20CappedTest(cap, name, symbol, apiKey) {
            const transactionType = "createBEP20WithCap"

            let transaction = await axios.post(
                bscPostUrl,
                JSON.stringify({ transactionType: transactionType, cap: cap, name: name, symbol: symbol }),
                headers(apiKey)
            )
            return transaction
        },
        async deployBEP20Capped(cap, name, symbol, apiKey) {
            const transactionType = "createBEP20WCapMain"

            let transaction = await axios.post(
                bscPostUrlOne,
                JSON.stringify({ transactionType: transactionType, cap: cap, name: name, symbol: symbol }),
                headers(apiKey)
            )
            return transaction
        },
        async deployBEP721(name, symbol, apiKey) {
            const transactionType = "deployBEP721"

            let transaction = await axios.post(
                bscPostUrlOne,
                JSON.stringify({ transactionType: transactionType, name: name, symbol: symbol }),
                headers(apiKey)
            )
            return transaction
        },
        async deployBEP721Test(name, symbol, apiKey) {
            const transactionType = "createBEP721"

            let transaction = await axios.post(
                bscPostUrl,
                JSON.stringify({ transactionType: transactionType, name: name, symbol: symbol }),
                headers(apiKey)
            )
            return transaction
        },
        async mintBEP721(contractAddress, mintToAddress, tokenUri, apiKey) {
            const transactionType = "mintBEP721"

            let transaction = await axios.post(
                bscPostUrl,
                JSON.stringify({
                    transactionType: transactionType,
                    contractAddress: contractAddress,
                    mintToAddress: mintToAddress,
                    tokenUri: tokenUri
                }),
                headers(apiKey)
            )
            return transaction
        },
        async mintBEP20(contractAddress, mintToAddress, amount, apiKey) {
            const transactionType = "mintBEP20Standard"

            let transaction = await axios.post(
                bscPostUrlOne,
                JSON.stringify({
                    transactionType: transactionType,
                    contractAddress: contractAddress,
                    mintToAddress: mintToAddress,
                    amount: amount
                }),
                headers(apiKey)
            )
            return transaction
        }
    },

    Ethereum: {
        async deployERC20(name, symbol) {
            const tokenType = "simpleERC20"

            let transaction = await axios.post(
                ethereumPostUrl,
                JSON.stringify({ tokenType: tokenType, name: name, symbol: symbol })
            )
            return transaction
        },
        async deployERC20Capped(cap, name, symbol, apiKey) {
            const transactionType = "deployCappedERC20"

            let transaction = await axios.post(
                ethPostUrlOne,
                JSON.stringify({ transactionType: transactionType, cap: cap, name: name, symbol: symbol }),
                headers(apiKey)
            )
            return transaction
        },
        async mintERC20(contractAddress, mintToAddress, amount, apiKey) {
            const transactionType = "mintERC20Standard"

            let transaction = await axios.post(
                ethPostUrlOne,
                JSON.stringify({
                    transactionType: transactionType,
                    contractAddress: contractAddress,
                    mintToAddress: mintToAddress,
                    amount: amount
                }),
                headers(apiKey)
            )
            return transaction
        }
    },

    Multi: {
        async deployERC721ArEth(name, symbol, imagepath, apiKey) {
            const contentType = mime.getType(imagepath)
            const image = await fs.readFile(imagepath, { encoding: "base64" })
            let transaction = await axios.post(
                multiPostUrl,
                JSON.stringify({ name: name, symbol: symbol, image: image, contentType: contentType }),
                headers(apiKey)
            )
            return transaction
        },
        async mintBscAr(contractAddress, addressToMintTo, imagepath, nftName, nftDescription, apiKey, attributes) {
            const contentType = mime.getType(imagepath)
            const image = await fs.readFile(imagepath, { encoding: "base64" })
            const transactionType = "mintBscAr"
            let transaction = await axios.post(
                bscPostUrlOne,
                JSON.stringify({
                    contractAddress: contractAddress,
                    addressToMintTo: addressToMintTo,
                    image: image,
                    contentType: contentType,
                    nftName: nftName,
                    nftDescription: nftDescription,
                    attributes: attributes,
                    transactionType: transactionType
                }),
                headers(apiKey)
            )
            return transaction
        }
    },

    Polygon: {
        async deployCappedPOL721(name, symbol, cap, apiKey) {
            let transaction = await axios.post(
                polygonPostUrl,
                JSON.stringify({ name: name, symbol: symbol, cap: cap }),
                headers(apiKey)
            )
            return transaction
        }
    },

    React: {
        async createBEP721(name, symbol, apiKey) {
            const transactionType = "createBEP721"

            let transaction = await axios.post(
                reactPostUrl,
                JSON.stringify({ name: name, symbol: symbol, transactionType: transactionType }),
                headers(apiKey)
            )
            return transaction
        },
        async createBEP721Test(name, symbol, apiKey) {
            const transactionType = "createBEP721Test"

            let transaction = await axios.post(
                reactPostUrl,
                JSON.stringify({ name: name, symbol: symbol, transactionType: transactionType }),
                headers(apiKey)
            )
            return transaction
        },
        async mintBEP721(
            contractAddress,
            addressToMintTo,
            image,
            contentType,
            nftName,
            nftDescription,
            attributes,
            apiKey
        ) {
            const transactionType = "mintBscAr"

            let transaction = await axios.post(
                reactPostUrl,
                JSON.stringify({
                    contractAddress: contractAddress,
                    addressToMintTo: addressToMintTo,
                    image: image,
                    contentType: contentType,
                    nftName: nftName,
                    nftDescription: nftDescription,
                    attributes: attributes,
                    transactionType: transactionType
                }),
                headers(apiKey)
            )
            return transaction
        }
    }
}

module.exports = IdexoSDK
