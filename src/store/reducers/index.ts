import { INetwork } from "../../dependencies/constants";
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
  SET_STABLE,
  GET_SALES_PRICES,
  CHANGE_ACCOUNT,
} from "../actionTypes";

interface Init {
  connected: boolean;
  account: string;
  isConnection: boolean;
  currentNetwork: INetwork | null;
  isCorrectNetwork: boolean;
  isSwitchingNetwork: boolean;
  gasPrice: string;
  isLoading: boolean;
  loading: boolean;
  stableBalance: string;
  rmzBalance: string;
  salePrice: string;
  ethBalance: string;
  stableName: string;
}

const initialState: Init = {
  connected: false,
  account: "",
  isConnection: false,
  currentNetwork: null,
  isCorrectNetwork: true,
  isSwitchingNetwork: false,
  gasPrice: "",
  isLoading: false,
  loading: false,
  stableBalance: "",
  rmzBalance: "",
  salePrice: "",
  ethBalance: "",
  stableName: "USDT",
};

export type RootState = ReturnType<typeof reducer>;
interface IAction {
  type: string;
  payload: any;
}

export default function reducer(
  state = initialState,
  { type, payload }: IAction
) {
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: payload,
      };
    case CONNECTION_STARTED:
      return {
        ...state,
        isConnection: true,
      };
    case CONNECTION_SUCCESS:
      return {
        ...state,
        connected: true,
        account: payload.account,
        currentNetwork: payload.currentNetwork,
        isCorrectNetwork: true,
        isConnection: false,
        isSwitchingNetwork: false,
      };
    case INCORRECT_NETWORK:
      return {
        ...state,
        account: payload,
        currentNetwork: null,
        isCorrectNetwork: false,
        isConnection: false,
      };
    case CONNECTION_LOST:
      return {
        ...state,
        connected: false,
        account: "",
        currentNetwork: null,
        isCorrectNetwork: true,
      };
    case LOGOUT:
      return {
        ...state,
        connected: false,
        account: "",
        currentNetwork: null,
        isCorrectNetwork: true,
        stableBalance: "",
        rmzBalance: "",
        salePrice: "",
        ethBalance: "",
      };
    case SET_NETWORKS_LIST:
      return {
        ...state,
        networksList: payload,
      };
    case CHANGE_NETWORK:
      return {
        ...state,
        currentNetwork: payload,
      };
    case CHANGE_ACCOUNT:
      return {
        ...state,
        account: payload.account,
      };
    case SET_STABLE:
      return {
        ...state,
        stableName: payload,
      };
    case GET_BALANCES:
      return {
        ...state,
        stableBalance: payload.stableBalance,
        rmzBalance: payload.rmzBalance,
        ethBalance: payload.ethBalance,
      };
    case GET_SALES_PRICES:
      return {
        ...state,
        salePrice: payload.salePrice,
        gasPrice: payload.gasPrice,
      };
    default: {
      return state;
    }
  }
}
