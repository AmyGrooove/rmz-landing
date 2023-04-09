import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";

import {
  ETHEREUM_NETWORK_ID,
  ETHEREUM_NETWORK,
  GOERLI_NETWORK_ID,
  GOERLI_TEST_NETWORK,
  INetwork,
} from "../constants/networks";

const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

export type Signature = {
  v: string;
  r: string;
  s: string;
};

interface IWeb3 {
  provider: any;
  setProvider: (provider: any) => void;
  setHttpProvider: (host: string) => void;
  setPKProvider: (networkId: number) => void;
  web3: () => Web3;
  getCurrentAccount: () => Promise<string | null>;
  getNetworkId: () => Promise<number>;
  __httpWeb3: (networkId?: number) => Promise<Web3>;
  initHttpWeb3: (networkId: number) => Promise<void>;
  getGasLimit: (callee: any, params: any) => Promise<number>;
  changeNetwork: (network: INetwork) => Promise<void>;
  sign: (hash: string, vrs: boolean) => Promise<Signature | string>;
}
const web3Helper: IWeb3 = {
  provider: null,
  setProvider(provider: any) {
    this.provider = provider;
  },

  setHttpProvider(host: string) {
    this.provider = new Web3.providers.HttpProvider(host);
  },

  setPKProvider(networkId: number) {
    this.provider = new HDWalletProvider(
      PRIVATE_KEY,
      {
        [GOERLI_NETWORK_ID]: GOERLI_TEST_NETWORK.rpcUrl,
        [ETHEREUM_NETWORK_ID]: ETHEREUM_NETWORK.rpcUrl,
      }[networkId]
    );
  },

  web3(): Web3 {
    if (this.provider !== null) {
      return new Web3(this.provider);
    }

    const provider = new Web3.providers.HttpProvider("");
    return new Web3(provider);
  },

  async sign(hash: string, vrs = true): Promise<Signature | string> {
    const getVRS = (signature: string): Signature => {
      const [r, s, v] = [
        `0x${signature.slice(0, 64)}`,
        `0x${signature.slice(64, 128)}`,
        `0x${signature.slice(128, 130)}`,
      ];
      return { r, s, v } as Signature;
    };
    const signature = await this.web3().eth.personal.sign(
      hash,
      (await web3Helper.getCurrentAccount()) as string,
      ""
    );
    return vrs ? getVRS(signature) : signature;
  },

  async getCurrentAccount() {
    const accounts = await this.web3().eth.getAccounts();
    return accounts.length ? accounts[0] : null;
  },

  async getNetworkId() {
    const id = await this.web3().eth.net.getId();
    return id;
  },

  async initHttpWeb3(networkId: number) {
    const web3 = await this.__httpWeb3(networkId);
    this.setProvider(web3.currentProvider);
  },

  async __httpWeb3(networkId?: number): Promise<Web3> {
    const web3 = this.web3();
    networkId = networkId || (await web3.eth.net.getId());
    const ethJsonRpcUrl = {
      [GOERLI_NETWORK_ID]: GOERLI_TEST_NETWORK.rpcUrl,
      [ETHEREUM_NETWORK_ID]: ETHEREUM_NETWORK.rpcUrl,
    }[networkId];

    const provider = new Web3.providers.HttpProvider(ethJsonRpcUrl || "");

    return new Web3(provider);
  },

  async getGasLimit(callee, params) {
    if (!callee) {
      return 21000;
    }
    const web3 = this.web3();
    const networkId = await web3.eth.net.getId();
    const coefficient = {}[networkId];
    return Math.trunc(callee.estimateGas(params) * Number(coefficient));
  },

  async changeNetwork(network: INetwork) {
    if (this.provider === null) {
      return;
    }
    try {
      await this.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: network.chainId }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await this.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: network.chainId,
                rpcUrls: [network.rpcUrl],
                chainName: network.name,
              },
            ],
          });
        } catch (error) {
          console.log(error);
        }
      }
      throw switchError;
    }
  },
};

export default web3Helper;
