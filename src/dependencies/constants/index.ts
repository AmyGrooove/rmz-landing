import CONTRACT_ADDRESSES from "./envConstant";
import ABI from "./abi";

const changeNetworkBool = process.env.NETWORK_TEST === "true" || false;

export * from "./networks";
export { ABI, CONTRACT_ADDRESSES, changeNetworkBool };
