import { defineChain } from "@reown/appkit/networks";

export const api_key = import.meta.env.THIRDWEB_API_KEY;

export const xrpEvmSidechain = defineChain({
  id: 1440002,
  caipNetworkId: "eip155:1440002",
  chainNamespace: "eip155",
  name: "XRP EVM Sidechain",
  nativeCurrency: {
    name: "XRP",
    symbol: "XRP",
    decimals: 18
  },
  rpcUrls: {
    public: {
      http: ["https://1440002.rpc.thirdweb.com"]
    },
    default: {
      http: ["https://rpc-evm-sidechain.xrpl.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "XRP EVM Sidechain",
      url: "https://evm-sidechain.xrpl.org/"
    }
  },
  testnet: true,
  assets: {
    imageId: "xrp-evm-sidechain",
    imageUrl: "@assets/xrp-evm-sidechain.png"
  }
});
