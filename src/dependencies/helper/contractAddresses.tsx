import {
  ETHEREUM_NETWORK_ID,
  GOERLI_NETWORK_ID,
  CONTRACT_ADDRESSES,
} from "../constants";

export const getStableAddress = (name: string, networkId: number) => {
  switch (name) {
    case "RMZ":
      return {
        [ETHEREUM_NETWORK_ID]: CONTRACT_ADDRESSES.RMZ_ADDRESS_ETHEREUM,
        [GOERLI_NETWORK_ID]: CONTRACT_ADDRESSES.RMZ_ADDRESS_GOERLI,
      }[networkId];

    case "USDT":
      return {
        [ETHEREUM_NETWORK_ID]: CONTRACT_ADDRESSES.USDT_ADDRESS_ETHEREUM,
        [GOERLI_NETWORK_ID]: CONTRACT_ADDRESSES.USDT_ADDRESS_GOERLI,
      }[networkId];

    case "USDC":
      return {
        [ETHEREUM_NETWORK_ID]: CONTRACT_ADDRESSES.USDC_ADDRESS_ETHEREUM,
        [GOERLI_NETWORK_ID]: CONTRACT_ADDRESSES.USDC_ADDRESS_GOERLI,
      }[networkId];

    case "DAI":
      return {
        [ETHEREUM_NETWORK_ID]: CONTRACT_ADDRESSES.DAI_ADDRESS_ETHEREUM,
        [GOERLI_NETWORK_ID]: CONTRACT_ADDRESSES.DAI_ADDRESS_GOERLI,
      }[networkId];

    default:
      return "";
  }
};

export const getExchangeAddress = (networkId: number) => {
  return {
    [ETHEREUM_NETWORK_ID]: CONTRACT_ADDRESSES.EXCHANGER_ADDRESS_ETHEREUM,
    [GOERLI_NETWORK_ID]: CONTRACT_ADDRESSES.EXCHANGER_ADDRESS_GOERLI,
  }[networkId];
};
