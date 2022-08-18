const axios = require("axios")
const fs = require("fs").promises
const mime = require("mime")
const reactPostUrl = "https://react.idexo.io"
const utilsUrl = "https://transactions.idexo.io"

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
    Common: {
        async transferOwnership(apiKey, network, contractAddress, newOwnerAddress) {
            const transactionType = "transferOwnership"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ contractAddress, newOwnerAddress, transactionType }),
                headers(apiKey)
            )
            return transaction
        }
    },

    Marketplace: {
        async deployMarketplace(apiKey, network, tradingFee, marketType) {
            if (marketType == "simple") {
                const transactionType = "deploySimpleMarketplace"

                let transaction = await axios.post(
                    chainURLs[network],
                    JSON.stringify({ tradingFee, transactionType }),
                    headers(apiKey)
                )
                return transaction
            } else if (marketType == "auction") {
                const transactionType = "deployAuctionMarketplace"

                let transaction = await axios.post(
                    chainURLs[network],
                    JSON.stringify({ tradingFee, transactionType }),
                    headers(apiKey)
                )
                return transaction
            }
        },
        async addNFTContract(apiKey, network, contractAddress, nftcontract) {
            const transactionType = "addMarketplaceNFTContract"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ contractAddress, nftcontract, transactionType }),
                headers(apiKey)
            )
            return transaction
        }
    },

    Multi: {
        async mintNFTWithImage(
            apiKey,
            network,
            contractAddress,
            addressToMintTo,
            image,
            nftName,
            nftDescription,
            attributes,
            imageIsBase64 = false,
            contentType
        ) {
            if (!imageIsBase64) {
                contentType = mime.getType(image)
                image = await fs.readFile(image, { encoding: "base64" })
            }

            const transactionType = "mintNFTWithImage"
            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({
                    contractAddress,
                    addressToMintTo,
                    image,
                    contentType,
                    nftName,
                    nftDescription,
                    attributes,
                    transactionType
                }),
                headers(apiKey)
            )
            return transaction
        }
    },

    NFTs: {
        async createCollectionCapped(apiKey, network, name, symbol, cap) {
            const transactionType = "createCollectionCapped"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, name, symbol, cap }),
                headers(apiKey)
            )
            return transaction
        },
        async createCollectionUncapped(apiKey, network, name, symbol) {
            const transactionType = "createCollectionUncapped"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, name, symbol }),
                headers(apiKey)
            )
            return transaction
        },
        async createCappedRoyalty(apiKey, network, name, symbol, royaltyCollector, royaltyBP, cap) {
            const transactionType = "createCappedRoyalty"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, name, symbol, royaltyCollector, royaltyBP, cap }),
                headers(apiKey)
            )
            return transaction
        },
        async createUncappedRoyalty(apiKey, network, name, symbol, royaltyCollector, royaltyBP) {
            const transactionType = "createUncappedRoyalty"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, name, symbol, royaltyCollector, royaltyBP }),
                headers(apiKey)
            )
            return transaction
        },
        async createSBTUncapped(apiKey, network, name, symbol) {
            const transactionType = "createSBTUncapped"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, name, symbol }),
                headers(apiKey)
            )
            return transaction
        },
        async createSBTCommunityUncapped(apiKey, network, name, symbol) {
            const transactionType = "createSBTCommunityUncapped"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, name, symbol }),
                headers(apiKey)
            )
            return transaction
        },
        async mintNFT(apiKey, network, contractAddress, mintToAddress, tokenUri) {
            const transactionType = "mintNFT"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, contractAddress, mintToAddress, tokenUri }),
                headers(apiKey)
            )
            return transaction
        },
        async mintRoyaltyNFT(apiKey, network, contractAddress, mintToAddress, tokenUri) {
            const transactionType = "mintRoyaltyNFT"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, contractAddress, mintToAddress, tokenUri }),
                headers(apiKey)
            )
            return transaction
        },
        async mintNFTBatch(apiKey, network, contractAddress, recipients, tokenUris) {
            const transactionType = "mintNFTBatch"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, contractAddress, recipients, tokenUris }),
                headers(apiKey)
            )
            return transaction
        },
        async setTokenURI(apiKey, network, contractAddress, tokenId, tokenUri) {
            const transactionType = "setTokenURI"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ contractAddress, tokenId, tokenUri, transactionType }),
                headers(apiKey)
            )
            return transaction
        },
        async getTokenURI(apiKey, network, contractAddress, tokenId) {
            const transactionType = "getTokenURI"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ contractAddress, tokenId, transactionType }),
                headers(apiKey)
            )
            return transaction
        },
        async getCollectionIds(apiKey, network, contractAddress, walletAddress, withURI = false) {
            const transactionType = "getCollectionIds"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ contractAddress, walletAddress, withURI, transactionType }),
                headers(apiKey)
            )
            return transaction
        },
        async getBalanceOf(apiKey, network, contractAddress, walletAddress) {
            const transactionType = "getBalanceOf"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ contractAddress, walletAddress, transactionType }),
                headers(apiKey)
            )
            return transaction
        }
    },

    React: {
        async createCollection(apiKey, network, name, symbol) {
            const transactionType = "createCollection"

            let transaction = await axios.post(
                reactPostUrl,
                JSON.stringify({ name, symbol, transactionType, network }),
                headers(apiKey)
            )
            return transaction
        },
        async mintNFT(apiKey, contractAddress, network, addressToMintTo, image, contentType, nftName, nftDescription, attributes) {
            const transactionType = "mintNFT"

            let transaction = await axios.post(
                reactPostUrl,
                JSON.stringify({
                    contractAddress,
                    addressToMintTo,
                    image,
                    contentType,
                    nftName,
                    nftDescription,
                    attributes,
                    transactionType,
                    network
                }),
                headers(apiKey)
            )
            return transaction
        }
    },

    Staking: {
        async deployPool(apiKey, network, name, symbol, baseUri, multi, depositTokens, rewardTokens) {
            if (multi == "true") {
                const transactionType = "deployStakingPool"
                const poolType = "multiRewards"

                let transaction = await axios.post(
                    chainURLs[network],
                    JSON.stringify({ tokenType, name, symbol }),
                    headers(apiKey)
                )
                return transaction
            } else {
                const transactionType = "deployStakingPool"
                const poolType = "singleRewards"
            }
        }
    },

    Storage: {
        async uploadPlain(apiKey, network, data) {
            const uploadType = "plainText"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ uploadType, data, encoding: "null" }),
                headers(apiKey)
            )
            return transaction
        },
        async uploadHTML(apiKey, network, data) {
            const uploadType = "HTML"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ uploadType, data, encoding: "null" }),
                headers(apiKey)
            )
            return transaction
        },
        async uploadJSON(apiKey, network, data) {
            const uploadType = "JSON"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ uploadType, data, encoding: "null" }),
                headers(apiKey)
            )
            return transaction
        },
        async uploadBuffer(apiKey, network, data, encoding) {
            //data must be string (should enforce that with type)
            const uploadType = "buffer"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ uploadType, data, encoding }),
                headers(apiKey)
            )
            return transaction
        },
        async uploadImage(apiKey, network, imagePath) {
            //data must be string (should enforce that with type)
            const uploadType = "image"
            const contentType = mime.getType(imagePath)
            const image = await fs.readFile(imagePath, { encoding: "base64" })

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ uploadType, image, contentType }),
                headers(apiKey)
            )
            return transaction
        }
    },

    Tokens: {
        async deployTokenCapped(apiKey, network, name, symbol, cap) {
            const transactionType = "deployToken"
            const tokenType = "capped"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, tokenType, cap, name, symbol }),
                headers(apiKey)
            )
            return transaction
        },
        async deployTokenSimple(apiKey, network, name, symbol) {
            const transactionType = "deployToken"
            const tokenType = "simple"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, tokenType, name, symbol }),
                headers(apiKey)
            )
            return transaction
        },
        async mintToken(apiKey, network, contractAddress, mintToAddress, amount) {
            const transactionType = "mintToken"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, contractAddress, mintToAddress, amount }),
                headers(apiKey)
            )
            return transaction
        }
    },

    Vesting: {
        async deployVesting(apiKey, network, depositToken, beneficiary, startTime, cliffMonth, durationMonth) {
            const transactionType = "deployVesting"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ depositToken, beneficiary, startTime, cliffMonth, durationMonth, transactionType }),
                headers(apiKey)
            )
            return transaction
        },
        async depositInitial(apiKey, network, contractAddress, amount) {
            const transactionType = "depositInitial"

            let transaction = await axios.post(
                chainURLs[network],
                JSON.stringify({ contractAddress, amount, transactionType }),
                headers(apiKey)
            )
            return transaction
        }
    },

    Utils: {
        async getContractAddress(apiKey, network, transactionHash) {
            let request = headers(apiKey)
            request.params = { path: "contract", network, hash: transactionHash }
            return await axios.get(utilsUrl, request)
        },
        async getTransactions(apiKey, network, timestampFrom, timestampTo) {
            let request = headers(apiKey)
            request.params = { path: "transactions", network, from: timestampFrom, to: timestampTo }
            return await axios.get(utilsUrl, request)
        },
        async getTransactionsByGroup(apiKey, network, group, timestampFrom, timestampTo) {
            let request = headers(apiKey)
            request.params = { path: "transactions", network, group, from: timestampFrom, to: timestampTo }
            return await axios.get(utilsUrl, request)
        }
    }
}

module.exports = IdexoSDK
