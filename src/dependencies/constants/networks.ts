export const ETHEREUM_NETWORK_ID = 1;
export const GOERLI_NETWORK_ID = 5;

export const ETHEREUM_CHAIN_NAME = "ethereum";
export const GOERLI_CHAIN_NAME = "goerli";

export interface INetwork {
  id: number;
  name: string;
  chainId: string;
  rpcUrl: string;
}

export const ETHEREUM_NETWORK: INetwork = {
  id: ETHEREUM_NETWORK_ID,
  name: "Ethereum",
  chainId: "0x1",
  rpcUrl: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
};

export const GOERLI_TEST_NETWORK: INetwork = {
  id: GOERLI_NETWORK_ID,
  name: "Goerli",
  chainId: "0x5",
  rpcUrl: "https://goerli.infura.io/v3/8da0044cc2304474b465e117df2febbf",
};

export const NetworksList: INetwork[] = [ETHEREUM_NETWORK, GOERLI_TEST_NETWORK];
