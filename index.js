const axios = require("axios")
const fs = require("fs").promises
const mime = require("mime")
const reactPostUrl = "https://react.idexo.io"
const utilsUrl = "https://transactions.idexo.io"

const chainURLs = {
    arweave: "https://ziparweave.idexo.io",
    avalanche: "https://avalanche.idexo.io",
    bnbchain: "https://mainnetbsc.idexo.io",
    dogechain: "https://dogechain.idexo.io",
    ethereum: "https://mainneteth.idexo.io",
    fantom: "https://fantom.idexo.io",
    filecoin: "https://filecoin.idexo.io",
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

            return await axios.post(
                chainURLs[network],
                JSON.stringify({ contractAddress, newOwnerAddress, transactionType }),
                headers(apiKey)
            )
        }
    },

    Marketplace: {
        async createSimpleMarketplace(apiKey, network, purchaseToken, saleStartTime, options) {
            const transactionType = "createSimpleMarketplace"
            return await axios.post(
                chainURLs[network],
                JSON.stringify({ purchaseToken, saleStartTime, options, transactionType }),
                headers(apiKey)
            )
        },
        async createAuctionMarketplace(apiKey, network, purchaseToken, maxDuration, options) {
            const transactionType = "createAuctionMarketplace"
            return await axios.post(
                chainURLs[network],
                JSON.stringify({ purchaseToken, maxDuration, options, transactionType }),
                headers(apiKey)
            )
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
            return await axios.post(
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
        }
    },

    NFTs: {
        async createCollectionCapped(apiKey, network, name, symbol, cap, options) {
            const transactionType = "createCollectionCapped"

            return await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, name, symbol, cap, options }),
                headers(apiKey)
            )
        },
        async createCollectionUncapped(apiKey, network, name, symbol, options) {
            const transactionType = "createCollectionUncapped"

            return await axios.post(chainURLs[network], JSON.stringify({ transactionType, name, symbol, options }), headers(apiKey))
        },
        async createCappedRoyalty(apiKey, network, name, symbol, royaltyCollector, royaltyBP, cap, options) {
            const transactionType = "createCappedRoyalty"

            return await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, name, symbol, royaltyCollector, royaltyBP, cap, options }),
                headers(apiKey)
            )
        },
        async createUncappedRoyalty(apiKey, network, name, symbol, royaltyCollector, royaltyBP, options) {
            const transactionType = "createUncappedRoyalty"

            return await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, name, symbol, royaltyCollector, royaltyBP, options }),
                headers(apiKey)
            )
        },
        async mintNFT(apiKey, network, contractAddress, mintToAddress, tokenUri) {
            const transactionType = "mintNFT"

            return await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, contractAddress, mintToAddress, tokenUri }),
                headers(apiKey)
            )
        },
        async mintRoyaltyNFT(apiKey, network, contractAddress, mintToAddress, tokenUri) {
            const transactionType = "mintRoyaltyNFT"

            return await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, contractAddress, mintToAddress, tokenUri }),
                headers(apiKey)
            )
        },
        async mintNFTBatch(apiKey, network, contractAddress, recipients, tokenUris) {
            const transactionType = "mintNFTBatch"

            return await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, contractAddress, recipients, tokenUris }),
                headers(apiKey)
            )
        },
        async setTokenURI(apiKey, network, contractAddress, tokenId, tokenUri) {
            const transactionType = "setTokenURI"

            return await axios.post(
                chainURLs[network],
                JSON.stringify({ contractAddress, tokenId, tokenUri, transactionType }),
                headers(apiKey)
            )
        },
        async getTokenURI(apiKey, network, contractAddress, tokenId) {
            const transactionType = "getTokenURI"

            return await axios.post(chainURLs[network], JSON.stringify({ contractAddress, tokenId, transactionType }), headers(apiKey))
        },
        async getCollectionIds(apiKey, network, contractAddress, walletAddress, withURI = false) {
            const transactionType = "getCollectionIds"

            return await axios.post(
                chainURLs[network],
                JSON.stringify({ contractAddress, walletAddress, withURI, transactionType }),
                headers(apiKey)
            )
        },
        async getBalanceOf(apiKey, network, contractAddress, walletAddress) {
            const transactionType = "getBalanceOf"

            return await axios.post(
                chainURLs[network],
                JSON.stringify({ contractAddress, walletAddress, transactionType }),
                headers(apiKey)
            )
        }
    },

    SBTs: {
        async createSBTCapped(apiKey, network, name, symbol, baseUri, cap, options) {
            const transactionType = "createSBTCapped"

            return await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, name, symbol, baseUri, cap, options }),
                headers(apiKey)
            )
        },
        async createSBTUncapped(apiKey, network, name, symbol, baseUri, options) {
            const transactionType = "createSBTUncapped"

            return await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, name, symbol, baseUri, options }),
                headers(apiKey)
            )
        },
        // TODO: add abi and methods
        // async createSBTCommunityUncapped(apiKey, network, name, symbol, options) {
        //     const transactionType = "createSBTCommunityUncapped"

        //     return await axios.post(chainURLs[network], JSON.stringify({ transactionType, name, symbol, options }), headers(apiKey))
        // },
        async mintSBT(apiKey, network, contractAddress, mintToAddress, tokenUri) {
            const transactionType = "mintSBT"

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
        }
    },

    React: {
        async createCollection(apiKey, network, name, symbol) {
            const transactionType = "createCollection"

            return await axios.post(reactPostUrl, JSON.stringify({ name, symbol, transactionType, network }), headers(apiKey))
        },
        async mintNFT(apiKey, contractAddress, network, addressToMintTo, image, contentType, nftName, nftDescription, attributes) {
            const transactionType = "mintNFT"

            return await axios.post(
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
        }
    },

    // TODO: move to idexocom-sdk
    // Staking: {
    //     async createPool(apiKey, network, name, symbol, baseUri, multi, depositTokens, rewardTokens) {
    //         if (multi == "true") {
    //             const transactionType = "createStakingPool"
    //             const poolType = "multiRewards"

    //             return await axios.post(chainURLs[network], JSON.stringify({ tokenType, name, symbol }), headers(apiKey))
    //         } else {
    //             const transactionType = "createStakingPool"
    //             const poolType = "singleRewards"
    //         }
    //     }
    // },

    Storage: {
        async uploadPlain(apiKey, network, data) {
            const uploadType = "plainText"

            return await axios.post(chainURLs[network], JSON.stringify({ uploadType, data, encoding: "null" }), headers(apiKey))
        },
        async uploadHTML(apiKey, network, data) {
            const uploadType = "HTML"

            return await axios.post(chainURLs[network], JSON.stringify({ uploadType, data, encoding: "null" }), headers(apiKey))
        },
        async uploadJSON(apiKey, network, data) {
            const uploadType = "JSON"

            return await axios.post(chainURLs[network], JSON.stringify({ uploadType, data, encoding: "null" }), headers(apiKey))
        },
        async uploadBuffer(apiKey, network, data, encoding) {
            //data must be string (should enforce that with type)
            const uploadType = "buffer"

            return await axios.post(chainURLs[network], JSON.stringify({ uploadType, data, encoding }), headers(apiKey))
        },
        async uploadImage(apiKey, network, imagePath) {
            //data must be string (should enforce that with type)
            const uploadType = "image"
            const contentType = mime.getType(imagePath)
            const image = await fs.readFile(imagePath, { encoding: "base64" })

            return await axios.post(chainURLs[network], JSON.stringify({ uploadType, image, contentType }), headers(apiKey))
        },
        async uploadNFTMetadata(apiKey, network, image, nftName, nftDescription, attributes, imageIsBase64 = false, contentType) {
            if (!imageIsBase64) {
                contentType = mime.getType(image)
                image = await fs.readFile(image, { encoding: "base64" })
            }

            const uploadType = "NFTMetadata"
            return await axios.post(
                chainURLs[network],
                JSON.stringify({
                    contractAddress,
                    addressToMintTo,
                    image,
                    contentType,
                    nftName,
                    nftDescription,
                    attributes,
                    uploadType
                }),
                headers(apiKey)
            )
        }
    },

    Tokens: {
        async createTokenCapped(apiKey, network, name, symbol, cap, options) {
            const transactionType = "createToken"
            const tokenType = "capped"

            return await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, tokenType, cap, name, symbol, options }),
                headers(apiKey)
            )
        },
        // TODO: add abi
        // async createTokenUncapped(apiKey, network, name, symbol) {
        //     const transactionType = "createToken"
        //     const tokenType = "uncapped"

        //     return await axios.post(chainURLs[network], JSON.stringify({ transactionType, tokenType, name, symbol }), headers(apiKey))
        // },
        async mintToken(apiKey, network, contractAddress, mintToAddress, amount) {
            const transactionType = "mintToken"

            return await axios.post(
                chainURLs[network],
                JSON.stringify({ transactionType, contractAddress, mintToAddress, amount }),
                headers(apiKey)
            )
        }
    },

    Vesting: {
        async createVesting(apiKey, network, depositToken, beneficiary, startTime, cliffDays, durationDays, claimsPeriod, options) {
            const transactionType = "createVesting"

            return await axios.post(
                chainURLs[network],
                JSON.stringify({
                    depositToken,
                    beneficiary,
                    startTime,
                    cliffDays,
                    durationDays,
                    claimsPeriod,
                    options,
                    transactionType
                }),
                headers(apiKey)
            )
        },
        async depositInitial(apiKey, network, contractAddress, amount) {
            const transactionType = "depositInitial"

            return await axios.post(chainURLs[network], JSON.stringify({ contractAddress, amount, transactionType }), headers(apiKey))
        },
        async getVestedAmount(apiKey, network, contractAddress) {
            const transactionType = "getVestedAmount"

            return await axios.post(chainURLs[network], JSON.stringify({ contractAddress, transactionType }), headers(apiKey))
        },
        async getAvailableClaimAmount(apiKey, network, contractAddress) {
            const transactionType = "getAvailableClaimAmount"

            return await axios.post(chainURLs[network], JSON.stringify({ contractAddress, transactionType }), headers(apiKey))
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
        },
        async getTransactionsByFunction(apiKey, function_name) {
            let request = headers(apiKey)
            request.params = { path: "functions", function_name }
            return await axios.get(utilsUrl, request)
        }
    }
}

module.exports = IdexoSDK
