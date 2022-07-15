require("dotenv").config({path:"/Users/alessioscannicchio/Documents/SalDigitalLtd/my-nft/.env"})

const API_URL = process.env.API_URL;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("/Users/alessioscannicchio/Documents/SalDigitalLtd/my-nft/artifacts/contracts/Mynft.sol/MyNFT.json")
const contractAddress = "0x0C9576E0C75Fd2b6F5F8Be53D8AC24C213388bCC"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI){
	const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

	//the transaction
	const tx = {
		'from': PUBLIC_KEY,
       		'to': contractAddress,
       		'nonce': nonce,
       		'gas': 500000,
       		'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
	};
const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
signPromise
	.then((signedTX) =>{
		web3.eth.sendSignedTransaction(
			signedTX.rawTransaction,
			function (err, hash){
				if (!err){
					console.log("The hash of your transaction is: ",
					hash,
					"\nCheck Alchemy's Mempool to view the status of your transaction!"
					)
				}else{
					console.log(
						"Something went wrong when submitting your transaction: ",
						err
					)
				}
			}
		)
	})
	.catch((err) => {
		console.log("Promise failed:",
		err)
	})
}

mintNFT(
	"ipfs://QmdqGk7Dmpv9haqHhLq4yjza9pfZwdrhxihWJkCWQeNNaR"
)