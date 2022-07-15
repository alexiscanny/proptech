/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config({path:"/Users/alessioscannicchio/Documents/SalDigitalLtd/my-nft/.env"});
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
   solidity: "0.8.4",
   defaultNetwork: "goerli",
   networks: {
      hardhat: {},
      goerli: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
};
