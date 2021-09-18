const HDWalletProvider = require("truffle-hdwallet-provider");

// Set your own mnemonic here
const mnemonic =
  "liquid seminar worry manage cover yellow museum lamp elevator fiction depth sad";

// Module exports to make this configuration available to Truffle itself
module.exports = {
  // Object with configuration for each network
  networks: {
    // Configuration for mainnet
    mainnet: {
      provider: function () {
        // Setting the provider with the Infura Mainnet address and Token
        return new HDWalletProvider(
          mnemonic,
          "https://mainnet.infura.io/v3/YOUR_TOKEN"
        );
      },
      network_id: "1",
    },
    // Configuration for rinkeby network
    rinkeby: {
      // Special function to setup the provider
      provider: function () {
        // Setting the provider with the Infura Rinkeby address and Token
        return new HDWalletProvider(
          mnemonic,
          "https://rinkeby.infura.io/v3/c182f21888fd4fb4b709f6ee30b9217a"
        );
      },
      network_id: 4,
    },
  },
  compilers: {
    solc: {
      version: "0.5.0",
    },
  },
};
