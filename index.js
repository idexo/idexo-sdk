const axios = require('axios')
const fs = require('fs')

const arweavePostUrl = 'https://nigxx0onpl.execute-api.us-east-1.amazonaws.com/default/post-arweave'
const ethereumPostUrl = 'https://nigxx0onpl.execute-api.us-east-1.amazonaws.com/default/post-eth'
const multiPostUrl = 'https://4a2pyktb01.execute-api.us-east-1.amazonaws.com/multiclass'


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
		async deployERC721ArEth(name, symbol, image, apiKey) {
			const headers = {
				"Content-Type": "application/json",
				"x-api-key": apiKey
			}
			const image64 = fs.readFileSync(image, 'base64')
			let transaction = await axios.post(multiPostUrl, JSON.stringify({ name: name, symbol: symbol, image: image64 }), { headers: headers })
			return transaction
		}
	}
		
		
}

module.exports = IdexoSDK

