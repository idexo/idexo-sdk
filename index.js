const axios = require("axios")
const fs = require("fs").promises
const mime = require("mime")
const reactPostUrl = "https://react.idexo.io"

const chainURLs = {
    arweave: "https://ziparweave.idexo.io",
    avalanche: "https://avalanche.idexo.io",
    binance: "https://mainnetbsc.idexo.io",
    ethereum: "https://mainneteth.idexo.io",
    fantom: "https://fantom.idexo.io",
    polygon: "https://polygon.idexo.io",
    solana: "https://solana.idexo.io"
}

function headers(apiKey) {
    return {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        }
    }
}

const IdexoSDK = {
    Marketplace: {
        async deployMarketplace(network, tradingFee, marketType, apiKey) {
            if (marketType == "simple") {
                const transactionType = "deploySimpleMarketplace"

                let transaction = await axios.post(
                    chainURLs[network],
                    JSON.stringify({
                        tradingFee: tradingFee,
                        transactionType: transactionType
                    }),
                    headers(apiKey)
                )
                return transaction
            } else if (marketType == "auction") {
                const transactionType = "deployAuctionMarketplace"

                let transaction = await axios.post(
                    chainURLs[network],
                    JSON.stringify({
                        tradingFee: tradingFee,
                        transactionType: transactionType
                    }),
                    headers(apiKey)
                )
                return transaction
            }
        },
        async addNFTContract(network, contractAddress, nftcontract, apiKey) {
            const transactionType = "addMarketplaceNFTContract"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({
                    contractAddress: contractAddress,
                    nftcontract: nftcontract,
                    transactionType: transactionType
                }),
                headers(apiKey)
            )
            return transaction
        }
    },

    Multi: {
        async mintNFTWithImage(network, contractAddress, addressToMintTo, imagepath, nftName, nftDescription, apiKey, attributes) {
            const contentType = mime.getType(imagepath)
            const image = await fs.readFile(imagepath, { encoding: "base64" })
            const transactionType = "mintNFTWithImage"
            let transaction = await axios.post(
                chainURLs[network],
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

    NFTs: {
        async createCollectionCapped(network, name, symbol, cap, apiKey) {
            const transactionType = "createCollection"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType: transactionType, name: name, symbol: symbol, cap: cap }),
                headers(apiKey)
            )
            return transaction
        },
        async createCollectionUncapped(network, name, symbol, apiKey) {
            const transactionType = "createCollectionUncapped"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType: transactionType, name: name, symbol: symbol }),
                headers(apiKey)
            )
            return transaction
        },
        async mintNFT(network, contractAddress, mintToAddress, tokenUri, apiKey) {
            const transactionType = "mintNFT"

            let transaction = await axios.post(
                chainURLs[network],
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
        async mintNFTBatch(network, contractAddress, recipients, tokenUris, apiKey) {
            const transactionType = "mintNFTBatch"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({
                    transactionType: transactionType,
                    contractAddress: contractAddress,
                    recipients: recipients,
                    tokenUris: tokenUris
                }),
                headers(apiKey)
            )
            return transaction
        },
        async setTokenURI(network, contractAddress, tokenId, tokenUri, apiKey) {
            const transactionType = "setTokenURI"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({
                    contractAddress: contractAddress,
                    tokenId: tokenId,
                    tokenUri: tokenUri,
                    transactionType: transactionType
                }),
                headers(apiKey)
            )
            return transaction
        },
        async getTokenURI(network, contractAddress, tokenId, apiKey) {
            const transactionType = "getTokenURI"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({
                    contractAddress: contractAddress,
                    tokenId: tokenId,
                    transactionType: transactionType
                }),
                headers(apiKey)
            )
            return transaction
        }
    },

    React: {
        async createCollection(network, name, symbol, apiKey) {
            const transactionType = "createCollection"

            let transaction = await axios.post(
                reactPostUrl,
                JSON.stringify({ name: name, symbol: symbol, transactionType: transactionType, network: network }),
                headers(apiKey)
            )
            return transaction
        },
        async mintNFT(contractAddress, network, addressToMintTo, image, contentType, nftName, nftDescription, attributes, apiKey) {
            const transactionType = "mintNFT"

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
                    transactionType: transactionType,
                    network: network
                }),
                headers(apiKey)
            )
            return transaction
        }
    },

    Staking: {
        async deployPool(network, name, symbol, baseUri, multi, depositTokens, rewardTokens, apiKey) {
            if (multi == "true") {
                const transactionType = "deployStakingPool"
                const poolType = "multiRewards"

                let transaction = await axios.post(chainURLs[network], JSON.stringify({ tokenType: tokenType, name: name, symbol: symbol }), headers(apiKey))
                return transaction
            } else {
                const transactionType = "deployStakingPool"
                const poolType = "singleRewards"
            }
        }
    },

    Storage: {
        async uploadPlain(network, data) {
            const uploadType = "plainText"

            let transaction = await axios.post(chainURLs[network], JSON.stringify({ uploadType: uploadType, data: data, encoding: "null" }))
            return transaction
        },
        async uploadHTML(network, data) {
            const uploadType = "HTML"

            let transaction = await axios.post(chainURLs[network], JSON.stringify({ uploadType: uploadType, data: data, encoding: "null" }))
            return transaction
        },
        async uploadBuffer(network, data, encoding) {
            //data must be string (should enforce that with type)
            const uploadType = "buffer"

            let transaction = await axios.post(chainURLs[network], JSON.stringify({ uploadType: uploadType, data: data, encoding: encoding }))
            return transaction
        },
        async uploadImage(network, imagepath) {
            //data must be string (should enforce that with type)
            const uploadType = "image"
            const contentType = mime.getType(imagepath)
            const image = await fs.readFile(imagepath, { encoding: "base64" })

            let transaction = await axios.post(chainURLs[network], JSON.stringify({ uploadType: uploadType, image: image, contentType: contentType }))
            return transaction
        }
    },

    Tokens: {
        async deployTokenCapped(network, name, symbol, cap, apiKey) {
            const transactionType = "deployToken"
            const tokenType = "capped"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({
                    transactionType: transactionType,
                    tokenType: tokenType,
                    cap: cap,
                    name: name,
                    symbol: symbol
                }),
                headers(apiKey)
            )
            return transaction
        },
        async deployTokenSimple(network, name, symbol, apiKey) {
            const transactionType = "deployToken"
            const tokenType = "simple"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({
                    transactionType: transactionType,
                    tokenType: tokenType,
                    name: name,
                    symbol: symbol
                }),
                headers(apiKey)
            )
            return transaction
        },
        async mintToken(network, contractAddress, mintToAddress, amount, apiKey) {
            const transactionType = "mintToken"

            let transaction = await axios.post(
                chainURLs[network],
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

    Vesting: {
        async deployVesting(network, depositToken, beneficiary, startTime, cliffMonth, durationMonth, apiKey) {
            const transactionType = "deployVesting"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({
                    depositToken: depositToken,
                    beneficiary: beneficiary,
                    startTime: startTime,
                    cliffMonth: cliffMonth,
                    durationMonth: durationMonth,
                    transactionType: transactionType
                }),
                headers(apiKey)
            )
            return transaction
        },
        async depositInitial(network, contractAddress, amount, apiKey) {
            const transactionType = "depositInitial"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({
                    contractAddress: contractAddress,
                    amount: amount,
                    transactionType: transactionType
                }),
                headers(apiKey)
            )
            return transaction
        }
    }
}

module.exports = IdexoSDK
