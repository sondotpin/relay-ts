import { Interface  } from "@ethersproject/abi";
import { BigNumberish } from "@ethersproject/bignumber/lib/bignumber";
import { formatBytes32String } from "ethers/lib/utils";
import { Wallet } from "@ethersproject/wallet";

const Erc20OrderRouterAbi =  [
  "function depositToken(uint256 _amount, address _module, address _inputToken, address payable _owner, address _witness, bytes calldata _data, bytes32 _secret)"
];

export class RelayService {
  erc20OrderRouterInterface: Interface;
  wallet: Wallet;

  constructor() {
    this.erc20OrderRouterInterface = new Interface(Erc20OrderRouterAbi);
    this.wallet = new Wallet(process.env.PRIVATE_KEY);
  }
  /**
   * @notice for testing
   */
  public async createCallData(
    _amount: BigNumberish,
    _module: string,
    _inputToken: string,
    _owner: string,
    _witness: string,
    _data: string,
    _secret: string,
  ): Promise<{ address: string, signature: string, functionData: string }> {
    const functionData = this.erc20OrderRouterInterface.encodeFunctionData("depositToken", [
      _amount,
      _module,
      _inputToken,
      _owner,
      _witness,
      formatBytes32String(_data),
      formatBytes32String(_secret),
    ]);
    const signature = await this.wallet.signMessage(functionData);
    return { address: this.wallet.address, signature, functionData };
  }

  public checkFunctionData(
    _data: string,
  ): boolean {
    try {
      this.erc20OrderRouterInterface.decodeFunctionData("depositToken", _data);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new RelayService();