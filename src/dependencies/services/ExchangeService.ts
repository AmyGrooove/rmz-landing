import { BigNumber, ethers } from "ethers";

import web3Helper from "../helper/web3";
import ABI from "../constants/abi";
import {
  getExchangeAddress,
  getStableAddress,
} from "../helper/contractAddresses";

class ExchangeService {
  async __createContract() {
    const web3 = web3Helper.web3();
    const networkId = await web3.eth.net.getId();
    const ExchangeAddress = getExchangeAddress(networkId);
    return new web3.eth.Contract(ABI.Exchanger, ExchangeAddress);
  }

  async __createStableContract(name: string) {
    const web3 = web3Helper.web3();
    const networkId = await web3.eth.net.getId();
    const StableAddress = getStableAddress(name, networkId);
    return new web3.eth.Contract(ABI.ERC20, StableAddress);
  }

  async getDecimals(stableName: string) {
    const stableContract = await this.__createStableContract(stableName);
    const decimals = await stableContract.methods.decimals().call();
    return decimals;
  }

  async convertToBigNumber(value: string, stableName?: string) {
    return ethers.utils.parseUnits(
      value.toString(),
      stableName ? await this.getDecimals(stableName) : 18
    );
  }

  async convertFromBigNumber(value: BigNumber, stableName?: string) {
    return ethers.utils.formatUnits(
      value.toString(),
      stableName ? await this.getDecimals(stableName) : 18
    );
  }

  async getGasPrice() {
    const web3 = web3Helper.web3();
    return web3.eth.getGasPrice();
  }

  async getPrices(value: string, stableName: string) {
    const contract = await this.__createContract();

    const web3 = web3Helper.web3();
    const networkId = await web3.eth.net.getId();
    const StableAddress = getStableAddress(stableName, networkId);
    const rmzAmount = await this.convertToBigNumber(value);
    const prices = await contract.methods
      .prices(StableAddress, rmzAmount)
      .call();

    const convertedStableAmount = await this.convertFromBigNumber(
      prices[0],
      stableName
    );
    const convertedRmzAmount = await this.convertFromBigNumber(prices[1]);

    return {
      stableAmountToApprove: convertedStableAmount,
      rmzAmountToBuy: convertedRmzAmount,
    };
  }

  async allowance(value: string, stableName: string) {
    const web3 = web3Helper.web3();
    const networkId = await web3.eth.net.getId();
    const exchangeAddress = getExchangeAddress(networkId);
    const stableContract = await this.__createStableContract(stableName);
    const address = await web3.eth.getAccounts();

    const approvedSumBig = ethers.utils.parseUnits(
      await stableContract.methods
        .allowance(address[0], exchangeAddress)
        .call(),
      0
    );

    const approvedSum = await this.convertFromBigNumber(
      approvedSumBig,
      stableName
    );

    return Number(value) <= Number(approvedSum);
  }

  async approve(value: string, stableName: string) {
    const contract = await this.__createStableContract(stableName);
    const currentAccount = await web3Helper.getCurrentAccount();
    const web3 = web3Helper.web3();
    const networkId = await web3.eth.net.getId();
    const exchangeAddress = getExchangeAddress(networkId);
    const valueToApprove = await this.convertToBigNumber(value, stableName);
    return await contract.methods
      .approve(exchangeAddress, valueToApprove)
      .send({ from: currentAccount });
  }

  async getRateFromStable(value: string, stableName: string) {
    const contract = await this.__createContract();
    const web3 = web3Helper.web3();
    const networkId = await web3.eth.net.getId();
    const stableAddress = getStableAddress(stableName, networkId);
    const bigNumberAmount = await this.convertToBigNumber(value, stableName);
    const rmzAmount = await contract.methods
      .getRateFromUSDT(stableAddress, bigNumberAmount)
      .call();
    const rate = await this.convertFromBigNumber(rmzAmount);

    return rate;
  }

  async getBalance(stableName: string) {
    const web3 = web3Helper.web3();
    const stableContract = await this.__createStableContract(stableName);
    const address = await web3.eth.getAccounts();
    const price = await stableContract.methods.balanceOf(address[0]).call();
    const balance = await this.convertFromBigNumber(price, stableName);
    return balance;
  }

  async buy(stableName: string, value: string) {
    const contract = await this.__createContract();
    const currentAccount = await web3Helper.getCurrentAccount();
    const amountBigNumber = await this.convertToBigNumber(value);
    const web3 = web3Helper.web3();
    const networkId = await web3.eth.net.getId();
    const addressStable = getStableAddress(stableName, networkId);

    return await contract.methods
      .buy(addressStable, amountBigNumber)
      .send({ from: currentAccount });
  }

  protected get abi() {
    return ABI.Exchanger;
  }
}

export default new ExchangeService();
