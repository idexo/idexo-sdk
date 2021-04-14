const axios = require('axios')
const fs = require('fs').promises;
const mime = require('mime')

const arweavePostUrl = 'https://nigxx0onpl.execute-api.us-east-1.amazonaws.com/default/post-arweave'
const ethereumPostUrl = 'https://nigxx0onpl.execute-api.us-east-1.amazonaws.com/default/post-eth'
const ethPostUrlOne = 'https://mainneteth.idexo.io'
const multiPostUrl = 'https://multiclass.idexo.io'
const bscPostUrl = 'https://idexobsc.idexo.io'
const bscPostUrlOne = 'https://mainnetbsc.idexo.io'


const IdexoSDK = {

	

	Arweave: {

		async uploadPlain(data) {

			const uploadType = 'plainText'
				
			let transaction = await axios.post(arweavePostUrl, JSON.stringify({ uploadType: uploadType, data: data, encoding: 'null' }))
			return transaction
		},
		async uploadHTML(data) {

			const uploadType = 'HTML'
				
			let transaction = await axios.post(arweavePostUrl, JSON.stringify({ uploadType: uploadType, data: data, encoding: 'null' }))
			return transaction
		},
		async uploadBuffer(data, encoding) { //data must be string (should enforce that with type)
			const uploadType = 'buffer'
			
			let transaction = await axios.post(arweavePostUrl, JSON.stringify({ uploadType: uploadType, data: data, encoding: encoding }))
			return transaction
		},
		async uploadImage(imagepath) { //data must be string (should enforce that with type)
			const uploadType = 'image'
			const contentType = mime.getType(imagepath)
			const image = await fs.readFile(imagepath, { encoding: 'base64' })
			
			let transaction = await axios.post(arweavePostUrl, JSON.stringify({ uploadType: uploadType, image: image, contentType: contentType }))
			return transaction
		}
	},

	Binance: {

		async deployBEP20(name, symbol, apiKey) {

			const headers = {
				"Content-Type": "application/json",
				"x-api-key": apiKey
			}

			const transactionType = 'deployBEP20Standard'
				
			let transaction = await axios.post(bscPostUrlOne, JSON.stringify({ transactionType: transactionType, name: name, symbol: symbol }), { headers: headers })
			return transaction
		}, 
		async deployBEP20Test(name, symbol, apiKey) {

			const headers = {
				"Content-Type": "application/json",
				"x-api-key": apiKey
			}

			const transactionType = 'createBEP20'
				
			let transaction = await axios.post(bscPostUrl, JSON.stringify({ transactionType: transactionType, name: name, symbol: symbol }), { headers: headers })
			return transaction
		},
		async deployBEP20CappedTest(cap, name, symbol, apiKey) {

			const headers = {
				"Content-Type": "application/json",
				"x-api-key": apiKey
			}

			const transactionType = 'createBEP20WithCap'
				
			let transaction = await axios.post(bscPostUrl, JSON.stringify({ transactionType: transactionType, cap: cap, name: name, symbol: symbol }), { headers: headers })
			return transaction
		},
		async deployBEP20Capped(cap, name, symbol, apiKey) {

			const headers = {
				"Content-Type": "application/json",
				"x-api-key": apiKey
			}

			const transactionType = 'createBEP20WCapMain'
				
			let transaction = await axios.post(bscPostUrlOne, JSON.stringify({ transactionType: transactionType, cap: cap, name: name, symbol: symbol }), { headers: headers })
			return transaction
		},
		async deployBEP721(name, symbol, apiKey) {

			const headers = {
				"Content-Type": "application/json",
				"x-api-key": apiKey
			}

			const transactionType = 'deployBEP721'
				
			let transaction = await axios.post(bscPostUrlOne, JSON.stringify({ transactionType: transactionType, name: name, symbol: symbol }), { headers: headers })
			return transaction
		}, 
		async deployBEP721Test(name, symbol, apiKey) {

			const headers = {
				"Content-Type": "application/json",
				"x-api-key": apiKey
			}

			const transactionType = 'createBEP721'
				
			let transaction = await axios.post(bscPostUrl, JSON.stringify({ transactionType: transactionType, name: name, symbol: symbol }), { headers: headers })
			return transaction
		}, 
		async mintBEP721(contractAddress, mintToAddress, tokenUri, apiKey) {

			const headers = {
				"Content-Type": "application/json",
				"x-api-key": apiKey
			}

			const transactionType = 'mintBEP721'
				
			let transaction = await axios.post(bscPostUrl, JSON.stringify({ transactionType: transactionType, contractAddress: contractAddress, mintToAddress: mintToAddress, tokenUri: tokenUri }), { headers: headers })
			return transaction
		},
		async mintBEP20(contractAddress, mintToAddress, amount, apiKey) {

			const headers = {
				"Content-Type": "application/json",
				"x-api-key": apiKey
			}

			const transactionType = 'mintBEP20Standard'
				
			let transaction = await axios.post(bscPostUrlOne, JSON.stringify({ transactionType: transactionType, contractAddress: contractAddress, mintToAddress: mintToAddress, amount: amount }), { headers: headers })
			return transaction
		}
	},

	Ethereum: {
		async deployERC20(name, symbol) {
			const tokenType = 'simpleERC20'

			let transaction = await axios.post(ethereumPostUrl, JSON.stringify({ tokenType: tokenType, name: name, symbol: symbol }))
			return transaction
		},
		async deployERC20Capped(cap, name, symbol, apiKey) {

			const headers = {
				"Content-Type": "application/json",
				"x-api-key": apiKey
			}

			const transactionType = 'deployCappedERC20'
				
			let transaction = await axios.post(ethPostUrlOne, JSON.stringify({ transactionType: transactionType, cap: cap, name: name, symbol: symbol }), { headers: headers })
			return transaction
		},
		async mintERC20(contractAddress, mintToAddress, amount, apiKey) {

			const headers = {
				"Content-Type": "application/json",
				"x-api-key": apiKey
			}

			const transactionType = 'mintERC20Standard'
				
			let transaction = await axios.post(ethPostUrlOne, JSON.stringify({ transactionType: transactionType, contractAddress: contractAddress, mintToAddress: mintToAddress, amount: amount }), { headers: headers })
			return transaction
		}
	},

	Multi: {
		async deployERC721ArEth(name, symbol, imagepath, apiKey) {
			const headers = {
				"Content-Type": "application/json",
				"x-api-key": apiKey
			}
			const contentType = mime.getType(imagepath)
			const image = await fs.readFile(imagepath, { encoding: 'base64' })
			let transaction = await axios.post(multiPostUrl, JSON.stringify({ name: name, symbol: symbol, image: image, contentType: contentType }), { headers: headers })
			return transaction
		},
		async mintBscAr(contractAddress, addressToMintTo, imagepath, nftName, nftDescription, apiKey, attributes) {
			const headers = {
				"Content-Type": "application/json",
				"x-api-key": apiKey
			}
			const contentType = mime.getType(imagepath)
			const image = await fs.readFile(imagepath, { encoding: 'base64' })
			const transactionType = 'mintBscAr'
			let transaction = await axios.post(bscPostUrlOne, JSON.stringify({ contractAddress: contractAddress, addressToMintTo: addressToMintTo, image: image, contentType: contentType, nftName: nftName, nftDescription: nftDescription, attributes: attributes, transactionType: transactionType }), { headers: headers })
			return transaction
		}
	}
		
		
}

module.exports = IdexoSDK

