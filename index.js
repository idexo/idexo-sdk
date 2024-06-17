const axios = require("axios")
const fs = require("fs").promises
const mime = require("mime")

const chainURLs = {
    arbitrum: "https://arbitrum.idexo.io",
    arbitrumnova: "https://arbitrumnova.idexo.io",
    arweave: "https://ziparweave.idexo.io",
    avalanche: "https://avalanche.idexo.io",
    ethereum: "https://mainneteth.idexo.io",
    filecoin: "https://filecoin.idexo.io",
    mantle: "https://mantle.idexo.io",
    optimism: "https://optimism.idexo.io",
    utilsUrl: "https://transactions.idexo.io",
    zksync: "https://zksync.idexo.io",
    zksynctest: "https://zksynctest.idexo.io"
}

function headers(apiKey) {
    return {
        "Content-Type": "application/json",
        "x-api-key": apiKey
    }
}

async function sendRequest(apiKey, network, data, method = "post", params = null) {
    let config = {
        method: method,
        url: chainURLs[network],
        headers: headers(apiKey)
    }
    if (data) config.data = JSON.stringify(data)
    if (params) config.params = params
    return await axios.request(config).catch(function (error) {
        if (error.response) {
            return error.response
        } else {
            return error
        }
    })
}

function isBase64String(str) {
    return str.length % 4 == 0 && /^[A-Za-z0-9+/]+[=]{0,2}$/.test(str)
}

function isStringURL(str) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(str)
}

function detectMimeType(b64) {
    for (var s in base64Signatures) {
        if (b64.indexOf(s) === 0) {
            return base64Signatures[s]
        }
    }
}

const base64Signatures = {
    JVBERi0: "application/pdf",
    R0lGODdh: "image/gif",
    R0lGODlh: "image/gif",
    iVBORw0KGgo: "image/png",
    "/9j/": "image/jpg",
    U: "image/webp"
}

const IdexoSDK = {
    Bridges: {
        async createRelayer(apiKey, network, type, tokenAddress, adminFee, bridgeWallet, threshold, signers, options) {
            if(type === "origin") {
                const transactionType = "createOriginRelayer"
                return await sendRequest(apiKey, network, { tokenAddress, adminFee, bridgeWallet, threshold, signers, options, transactionType })
            }
            else if(type === "destination") {
                const transactionType = "createDestinationRelayer"
                return await sendRequest(apiKey, network, { tokenAddress, adminFee, bridgeWallet, threshold, signers, options, transactionType })
            }
            
        }
    },

    Common: {
        async transferOwnership(apiKey, network, contractAddress, newOwnerAddress) {
            const transactionType = "transferOwnership"
            return await sendRequest(apiKey, network, { contractAddress, newOwnerAddress, transactionType })
        }
    },

    Marketplace: {
        async createSimpleMarketplace(apiKey, network, purchaseToken, saleStartTime, options) {
            const transactionType = "createSimpleMarketplace"
            return await sendRequest(apiKey, network, { purchaseToken, saleStartTime, options, transactionType })
        },
        async createAuctionMarketplace(apiKey, network, purchaseToken, maxDuration, options) {
            const transactionType = "createAuctionMarketplace"
            return await sendRequest(apiKey, network, { purchaseToken, maxDuration, options, transactionType })
        },
        async listNFTMeta(apiKey, network, contractAddress, sender, nftContractAddress, tokenId, price, nonce, request, signature, options) {
            const transactionType = "listNFTMeta"
            return await sendRequest(apiKey, network, { contractAddress, sender, nftContractAddress, tokenId, price, nonce, request, signature, options, transactionType })
        }
    },

    Multi: {
        // image (string) can be 1) path to file, 2) url, or 3) base64 string
        async mintNFTWithImage(apiKey, network, contractAddress, mintToAddress, image, nftName, nftDescription, attributes, options) {
            let contentType

            // if image is string path to file
            if (!isStringURL(image) && !isBase64String(image)) {
                contentType = mime.getType(image)
                image = await fs.readFile(image, { encoding: "base64" })
            }
            if (isBase64String(image)) contentType = detectMimeType(image)
            if (contentType === undefined && !isStringURL(image)) throw "unsupported file type! image must be jpg, png, gif, webp, or pdf"

            const transactionType = "mintNFTWithImage"

            return await sendRequest(apiKey, network, {
                contractAddress,
                mintToAddress,
                image,
                contentType,
                nftName,
                nftDescription,
                attributes,
                transactionType,
                options
            })
        },

        async mintRoyaltyNFTWithImage(apiKey, network, contractAddress, mintToAddress, image, nftName, nftDescription, attributes, options) {
            let contentType

            // if image is string path to file
            if (!isStringURL(image) && !isBase64String(image)) {
                contentType = mime.getType(image)
                image = await fs.readFile(image, { encoding: "base64" })
            }
            if (isBase64String(image)) contentType = detectMimeType(image)
            if (contentType === undefined && !isStringURL(image)) throw "unsupported file type! image must be jpg, png, gif, webp, or pdf"

            const transactionType = "mintRoyaltyNFTWithImage"

            return await sendRequest(apiKey, network, {
                contractAddress,
                mintToAddress,
                image,
                contentType,
                nftName,
                nftDescription,
                attributes,
                transactionType,
                options
            })
        }
    },

    NFTs: {
        async createCollectionCapped(apiKey, network, name, symbol, cap, options) {
            const transactionType = "createCollectionCapped"

            return await sendRequest(apiKey, network, { transactionType, name, symbol, cap, options })
        },
        async createCollectionUncapped(apiKey, network, name, symbol, options) {
            const transactionType = "createCollectionUncapped"

            return await sendRequest(apiKey, network, { transactionType, name, symbol, options })
        },
        async createCappedRoyalty(apiKey, network, name, symbol, royaltyCollector, royaltyBP, cap, options) {
            const transactionType = "createCappedRoyalty"

            return await sendRequest(apiKey, network, { transactionType, name, symbol, royaltyCollector, royaltyBP, cap, options })
        },
        async createUncappedRoyalty(apiKey, network, name, symbol, royaltyCollector, royaltyBP, options) {
            const transactionType = "createUncappedRoyalty"

            return await sendRequest(apiKey, network, { transactionType, name, symbol, royaltyCollector, royaltyBP, options })
        },
        async mintNFT(apiKey, network, contractAddress, mintToAddress, tokenUri) {
            const transactionType = "mintNFT"

            return await sendRequest(apiKey, network, { transactionType, contractAddress, mintToAddress, tokenUri })
        },
        async mintRoyaltyNFT(apiKey, network, contractAddress, mintToAddress, tokenUri) {
            const transactionType = "mintRoyaltyNFT"

            return await sendRequest(apiKey, network, { transactionType, contractAddress, mintToAddress, tokenUri })
        },
        async mintNFTBatch(apiKey, network, contractAddress, recipients, tokenUris) {
            const transactionType = "mintNFTBatch"

            return await sendRequest(apiKey, network, { transactionType, contractAddress, recipients, tokenUris })
        },
        async setTokenURI(apiKey, network, contractAddress, tokenId, tokenUri) {
            const transactionType = "setTokenURI"

            return await sendRequest(apiKey, network, { contractAddress, tokenId, tokenUri, transactionType })
        },
        async getTokenURI(apiKey, network, contractAddress, tokenId) {
            const transactionType = "getTokenURI"

            return await sendRequest(apiKey, network, { contractAddress, tokenId, transactionType })
        },
        async getCollectionIds(apiKey, network, contractAddress, walletAddress, withURI = false) {
            const transactionType = "getCollectionIds"

            return await sendRequest(apiKey, network, { contractAddress, walletAddress, withURI, transactionType })
        },
        async getBalanceOf(apiKey, network, contractAddress, walletAddress) {
            const transactionType = "getBalanceOf"

            return await sendRequest(apiKey, network, { contractAddress, walletAddress, transactionType })
        }
    },

    SBTs: {
        async createSBTCapped(apiKey, network, name, symbol, baseUri, cap, options) {
            const transactionType = "createSBTCapped"

            return await sendRequest(apiKey, network, { transactionType, name, symbol, baseUri, cap, options })
        },
        async createSBTUncapped(apiKey, network, name, symbol, baseUri, options) {
            const transactionType = "createSBTUncapped"

            return await sendRequest(apiKey, network, { transactionType, name, symbol, baseUri, options })
        },
        async createLinkedSBTUncapped(apiKey, network, name, symbol, baseUri, options) {
            const transactionType = "createUncappedLinkedSBT"

            return await sendRequest(apiKey, network, { transactionType, name, symbol, baseUri, options })
        },
        // TODO: add abi and methods
        // async createSBTCommunityUncapped(apiKey, network, name, symbol, options) {
        //     const transactionType = "createSBTCommunityUncapped"

        //     return await axios.post(chainURLs[network], JSON.stringify({ transactionType, name, symbol, options }), headers(apiKey))
        // },
        async mintSBT(apiKey, network, contractAddress, mintToAddress, tokenUri) {
            const transactionType = "mintSBT"

            return await sendRequest(apiKey, network, {
                transactionType,
                contractAddress,
                mintToAddress,
                tokenUri
            })
        },

         // image (string) can be 1) path to file, 2) url, or 3) base64 string
         async mintSBTWithImage(apiKey, network, contractAddress, mintToAddress, image, nftName, nftDescription, attributes, options) {
            let contentType

            // if image is string path to file
            if (!isStringURL(image) && !isBase64String(image)) {
                contentType = mime.getType(image)
                image = await fs.readFile(image, { encoding: "base64" })
            }
            if (isBase64String(image)) contentType = detectMimeType(image)
            if (contentType === undefined && !isStringURL(image)) throw "unsupported file type! image must be jpg, png, gif, webp, or pdf"

            const transactionType = "mintSBTWithImage"

            return await sendRequest(apiKey, network, {
                contractAddress,
                mintToAddress,
                image,
                contentType,
                nftName,
                nftDescription,
                attributes,
                transactionType,
                options
            })
        }
    },

    Staking: {
        async createStakePoolMultiple(apiKey, network, poolName, symbol, baseUri, depositToken, rewardToken, options) {
            const transactionType = "createStakePoolMultipleRewards"

            return await sendRequest(apiKey, network, {
                transactionType,
                poolName,
                symbol,
                baseUri,
                depositToken,
                rewardToken,
                options
            })
        }
    },

    Storage: {
        async uploadPlain(apiKey, network, data) {
            const uploadType = "plainText"

            return await sendRequest(apiKey, network, { uploadType, data, encoding: "null" })
        },
        async uploadHTML(apiKey, network, data) {
            const uploadType = "HTML"

            return await sendRequest(apiKey, network, { uploadType, data, encoding: "null" })
        },
        async uploadJSON(apiKey, network, data) {
            const uploadType = "JSON"

            return await sendRequest(apiKey, network, { uploadType, data, encoding: "null" })
        },
        async uploadBuffer(apiKey, network, data, encoding) {
            // data must be string (should enforce that with type)
            const uploadType = "buffer"

            return await sendRequest(apiKey, network, { uploadType, data, encoding })
        },
        async uploadImage(apiKey, network, imagePath) {
            // data must be string (should enforce that with type)
            const uploadType = "image"
            const contentType = mime.getType(imagePath)
            const image = await fs.readFile(imagePath, { encoding: "base64" })

            return await sendRequest(apiKey, network, { uploadType, image, contentType })
        },
        // image (string) can be 1) path to file, 2) url, or 3) base64 string
        async uploadNFTMetadata(apiKey, network, image, nftName, nftDescription, attributes, options) {
            let contentType

            // if image is string path to file
            if (!isStringURL(image) && !isBase64String(image)) {
                contentType = mime.getType(image)
                image = await fs.readFile(image, { encoding: "base64" })
            }
            if (isBase64String(image)) contentType = detectMimeType(image)
            if (contentType === undefined && !isStringURL(image)) throw "unsupported file type! image must be jpg, png, gif, webp, or pdf"

            const uploadType = "NFTMetadata"

            return await sendRequest(apiKey, network, {
                image,
                contentType,
                nftName,
                nftDescription,
                attributes,
                uploadType,
                options
            })
        }
    },

    Tokens: {
        async createTokenCapped(apiKey, network, name, symbol, cap, options) {
            const transactionType = "createTokenCapped"

            return await sendRequest(apiKey, network, { transactionType, cap, name, symbol, options })
        },
        // TODO: add abi
        // async createTokenUncapped(apiKey, network, name, symbol, options) {
        //     const transactionType = "createTokenUncapped"

        //     return await axios.post(chainURLs[network], JSON.stringify({ transactionType, name, symbol, options }), headers(apiKey))
        // },
        async mintToken(apiKey, network, contractAddress, mintToAddress, amount) {
            const transactionType = "mintToken"

            return await sendRequest(apiKey, network, { transactionType, contractAddress, mintToAddress, amount })
        }
    },

    Vesting: {
        async createVesting(apiKey, network, depositToken, beneficiary, startTime, cliffDays, durationDays, claimsPeriod, options) {
            const transactionType = "createVesting"

            return await sendRequest(apiKey, network, {
                depositToken,
                beneficiary,
                startTime,
                cliffDays,
                durationDays,
                claimsPeriod,
                options,
                transactionType
            })
        },
        async getVestedAmount(apiKey, network, contractAddress) {
            const transactionType = "getVestedAmount"

            return await sendRequest(apiKey, network, { contractAddress, transactionType })
        },
        async getAvailableClaimAmount(apiKey, network, contractAddress) {
            const transactionType = "getAvailableClaimAmount"

            return await sendRequest(apiKey, network, { contractAddress, transactionType })
        }
    },

    Utils: {
        async getContractAddress(apiKey, network, transactionHash) {
            let params = { path: "contract", network, hash: transactionHash }
            return await sendRequest(apiKey, "utilsUrl", null, "get", params)
        },
        async getTransactions(apiKey, network, timestampFrom, timestampTo) {
            let params = { path: "transactions", network, from: timestampFrom, to: timestampTo }
            return await sendRequest(apiKey, "utilsUrl", null, "get", params)
        },
        async getTransactionsByGroup(apiKey, network, group, timestampFrom, timestampTo) {
            let params = { path: "transactions", network, group, from: timestampFrom, to: timestampTo }
            return await sendRequest(apiKey, "utilsUrl", null, "get", params)
        },
        async getTransactionsByFunction(apiKey, function_name) {
            let params = { path: "functions", function_name }
            return await sendRequest(apiKey, "utilsUrl", null, "get", params)
        }
    }
}

module.exports = IdexoSDK
