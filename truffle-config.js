const HDWalletProvider = require("truffle-hdwallet-provider");
const LoomTruffleProvider = require('loom-truffle-provider');

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
    loom_testnet: {
      provider: function() {
        const privateKey = 'gZVPwmJgl+L2WGJKgLFgoHCEFWwQ0Bu5VQSBocaoZBJ1A376fONgU74iaX3r/dXc9vAU2cl5vIrUoq6yKLC3MQ=='
        const chainId = 'extdev-plasma-us1';
        const writeUrl = 'http://extdev-plasma-us1.dappchains.com:80/rpc';
        const readUrl = 'http://extdev-plasma-us1.dappchains.com:80/query';
        return new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey);
        },
      network_id: '9545242630824'
    },
  },
  compilers: {
    solc: {
      version: "0.5.0",
    },
  },
};
