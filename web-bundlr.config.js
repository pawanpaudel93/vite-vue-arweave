const dotenv = require("dotenv");
dotenv.config();

/** @type {import('web-bundlr').WebBundlrConfig} */

const WebBundlrConfig = {
  url: "https://devnet.bundlr.network",
  currency: "ethereum",
  wallet: process.env.WALLET,
  folderPath: "dist",
  config: {
    providerUrl: "https://rpc.ankr.com/eth_rinkeby",
  },
};

module.exports = WebBundlrConfig;
