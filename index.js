const axios = require('axios')
const fs = require('fs').promises;
const mime = require('mime')

const arweavePostUrl = 'https://nigxx0onpl.execute-api.us-east-1.amazonaws.com/default/post-arweave'
const ethereumPostUrl = 'https://nigxx0onpl.execute-api.us-east-1.amazonaws.com/default/post-eth'
const multiPostUrl = 'https://4a2pyktb01.execute-api.us-east-1.amazonaws.com/multiclass'
const bscPostUrl = 'https://aiuh3j0713.execute-api.us-east-1.amazonaws.com/idexobsc'


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

			const transactionType = 'createBEP20'
				
			let transaction = await axios.post(bscPostUrl, JSON.stringify({ transactionType: transactionType, name: name, symbol: symbol }), { headers: headers })
			return transaction
		}
	},

	Ethereum: {
		async deployERC20(name, symbol) {
			const tokenType = 'simpleERC20'

			let transaction = await axios.post(ethereumPostUrl, JSON.stringify({ tokenType: tokenType, name: name, symbol: symbol }))
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
		}
	}
		
		
}

module.exports = IdexoSDK

