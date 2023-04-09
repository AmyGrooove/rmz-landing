import { AbiItem } from 'web3-utils';

import ERC20 from './ERC20Abi.json';
import Exchanger from './ExchangerAbi.json';

export default {
  ERC20: ERC20 as AbiItem[],
  Exchanger: Exchanger as AbiItem[],
};
