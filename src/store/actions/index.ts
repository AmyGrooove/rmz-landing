import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import detectEthereumProvider from "@metamask/detect-provider";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {
  INetwork,
  NetworksList,
  ETHEREUM_NETWORK_ID,
  ETHEREUM_NETWORK,
  GOERLI_TEST_NETWORK,
  GOERLI_NETWORK_ID,
} from "../../dependencies/constants/networks";
import web3Helper from "../../dependencies/helper/web3";
import {
  LOGOUT,
  SET_NETWORKS_LIST,
  LOADING,
  CONNECTION_LOST,
  INCORRECT_NETWORK,
  CHANGE_NETWORK,
  CONNECTION_SUCCESS,
  CONNECTION_STARTED,
  GET_BALANCES,
  GET_SALES_PRICES,
  SET_STABLE,
  CHANGE_ACCOUNT,
} from "../actionTypes";
import { changeNetworkBool } from "../../dependencies/constants";
import ExchangeService from "../../dependencies/services/ExchangeService";

export const WALLET_METAMASK = "WALLET_METAMASK";
export const WALLET_WC = "WALLET_WC";

export const WC_BRIDGE = process.env.WC_BRIDGE || "";

export type AppThunk = ThunkAction<void, unknown, unknown, AnyAction>;

export const checkConnection = () => async (dispatch: any) => {
  const checkValue = localStorage.getItem("WALLET_CONNECTION_TYPE");

  if (checkValue !== null) {
    dispatch(connect(checkValue));
  }
};

export const connect =
  (walletType: string) => async (dispatch: any, getState: any) => {
    if (changeNetworkBool) {
      dispatch(setNetworksList(GOERLI_NETWORK_ID));
    } else {
      dispatch(setNetworksList(ETHEREUM_NETWORK_ID));
    }

    const checkChainId = async (chainId: number, isInitialAuth?: boolean) => {
      const { networksList } = getState();

      const networkData =
        networksList.find((net: INetwork) => net.id === chainId) || null;
      const account = await web3Helper.getCurrentAccount();
      if (account === null) {
        dispatch({
          type: CONNECTION_LOST,
        });
        return;
      }

      if (networkData === null) {
        dispatch({
          type: INCORRECT_NETWORK,
          payload: account,
        });

        dispatch(changeNetwork(isInitialAuth));
      } else {
        dispatch({
          type: CONNECTION_SUCCESS,
          payload: {
            account,
            currentNetwork: networkData,
          },
        });
        localStorage.setItem("WALLET_CONNECTION_TYPE", walletType);
      }
    };

    if (walletType === WALLET_METAMASK) {
      dispatch({
        type: CONNECTION_STARTED,
      });

      const provider: any = await detectEthereumProvider();

      if (provider?.providers) {
        const { providers } = provider;
        web3Helper.setProvider(providers[1]);
        const metamaskProviderIndex = providers.findIndex(
          (providerItem: any) => providerItem.isMetaMask
        );
        provider.selectedProvider = providers[metamaskProviderIndex];
      } else {
        web3Helper.setProvider(provider);
      }

      try {
        provider.on("accountsChanged", (accounts: any) => {
          if (accounts.length === 0) {
            dispatch({
              type: CONNECTION_LOST,
            });
          }

          const { account } = getState();

          if (accounts !== account) {
            dispatch({
              type: CHANGE_ACCOUNT,
              payload: {
                account: accounts[0],
              },
            });
            dispatch(getData());
          }
        });
        provider.on("chainChanged", (newChainId: any) => {
          provider.request({ method: "eth_requestAccounts" });
          const chainId = parseInt(newChainId, 16);
          checkChainId(chainId);
        });
        provider.request({ method: "eth_chainId" }).then((res: any) => {
          provider
            .request({ method: "eth_requestAccounts" })
            .then(() => {
              const chainId = parseInt(res, 16);
              checkChainId(chainId, true);
            })
            .catch(() => {
              dispatch({
                type: CONNECTION_LOST,
              });
            });
        });
      } catch (error) {
        console.log(error);
      }
    } else if (walletType === WALLET_WC) {
      const provider: any = new WalletConnectProvider({
        rpc: {
          [ETHEREUM_NETWORK_ID]: ETHEREUM_NETWORK.rpcUrl,
          [GOERLI_NETWORK_ID]: GOERLI_TEST_NETWORK.rpcUrl,
        },
        bridge: WC_BRIDGE,
        chainId: ETHEREUM_NETWORK_ID,
      });

      web3Helper.setProvider(provider);

      try {
        provider.on("chainChanged", (newChainId: any) => {
          checkChainId(newChainId);
        });
        provider.on("disconnect", () => {
          dispatch({
            type: CONNECTION_LOST,
          });
        });
        await provider.enable();
        const networkId = await web3Helper.getNetworkId();
        checkChainId(networkId);
      } catch (error) {
        console.log(error);
        dispatch({ type: CONNECTION_LOST });
      }
    }
  };

export const changeNetwork =
  (isInitialAuth?: boolean) => async (dispatch: any, getState: any) => {
    const { networksList } = getState();

    if (isInitialAuth) {
      try {
        if (changeNetworkBool) {
          await web3Helper.changeNetwork(GOERLI_TEST_NETWORK);
        } else {
          await web3Helper.changeNetwork(ETHEREUM_NETWORK);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        if (changeNetworkBool) {
          await web3Helper.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: GOERLI_TEST_NETWORK.name,
                chainId: GOERLI_TEST_NETWORK.chainId,
                nativeCurrency: {
                  name: "ETH",
                  decimals: 18,
                  symbol: "ETH",
                },
                rpcUrls: [GOERLI_TEST_NETWORK.rpcUrl],
              },
            ],
          });
        } else {
          await web3Helper.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: ETHEREUM_NETWORK.name,
                chainId: ETHEREUM_NETWORK.chainId,
                nativeCurrency: {
                  name: "ETH",
                  decimals: 18,
                  symbol: "ETH",
                },
                rpcUrls: [ETHEREUM_NETWORK.rpcUrl],
              },
            ],
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    const networkData =
      networksList.find((net: INetwork) => net.id === ETHEREUM_NETWORK_ID) ||
      null;

    dispatch({
      type: CHANGE_NETWORK,
      currentNetwork: networkData,
    });
  };

export const disconnect = () => (dispatch: any) => {
  web3Helper.setProvider(null);
  localStorage.clear();
  dispatch({
    type: LOGOUT,
  });
};

export const setNetworksList =
  (defaultBlockchainId?: number | undefined) => (dispatch: any) => {
    let filteredNetworks = NetworksList;
    if (defaultBlockchainId !== undefined && defaultBlockchainId !== null) {
      filteredNetworks = NetworksList.filter(
        (network) => network.id === defaultBlockchainId
      );
    }
    dispatch({
      type: SET_NETWORKS_LIST,
      payload: filteredNetworks,
    });
  };

export const setLoading = (bool: boolean) => (dispatch: any) => {
  dispatch({
    type: LOADING,
    payload: bool,
  });
};

export const changeStable = (name: string) => (dispatch: any) => {
  dispatch({
    type: SET_STABLE,
    payload: name,
  });
  dispatch(getData());
};

export const getData = () => async (dispatch: any) => {
  await dispatch(setLoading(true));

  await dispatch(getBalances());
  await dispatch(getSalesPrices());

  await dispatch(setLoading(false));
};

export const getSalesPrices = () => async (dispatch: any, getState: any) => {
  const { stableName } = getState();

  const gasPrice = await ExchangeService.getGasPrice();
  const salePrice = (
    1 / Number(await ExchangeService.getRateFromStable("1", stableName))
  ).toString();

  dispatch({
    type: GET_SALES_PRICES,
    payload: {
      salePrice,
      gasPrice,
    },
  });
};

export const getBalances = () => async (dispatch: any, getState: any) => {
  const { stableName } = getState();

  const stableBalance = await ExchangeService.getBalance(stableName);
  const rmzBalance = await ExchangeService.getBalance("RMZ");

  const web3 = web3Helper.web3();
  const address = await web3.eth.getAccounts();
  const ethBalance = await web3.eth.getBalance(address[0]);

  dispatch({
    type: GET_BALANCES,
    payload: {
      stableBalance,
      rmzBalance,
      ethBalance,
    },
  });
};
