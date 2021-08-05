// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import { verifyMessage } from 'ethers/lib/utils';
import { RelayService } from '../../src/services/relay.service';

describe('Relay', () => {
  let relayService: RelayService;

  beforeEach(() => {
    relayService = new RelayService();
  });

  it('test', () => {
    expect(1).toEqual(1);
  })

  it('Create call data', async () => {
    const amount = 1000;
    const module = '0x519e9c406a7e5c6016efE687a011E67203419671';
    const inputToken = '0x519e9c406a7e5c6016efE687a011E67203419671';
    const owner = '0x519e9c406a7e5c6016efE687a011E67203419671';
    const witness = '0x519e9c406a7e5c6016efE687a011E67203419671';
    const data = 'test';
    const secret = 'test';
    const result: { address: string, signature: string, functionData: string } = await relayService.createCallData(amount, module, inputToken, owner, witness, data, secret);
    expect(result.functionData).toEqual("0x486046a800000000000000000000000000000000000000000000000000000000000003e8000000000000000000000000519e9c406a7e5c6016efe687a011e67203419671000000000000000000000000519e9c406a7e5c6016efe687a011e67203419671000000000000000000000000519e9c406a7e5c6016efe687a011e67203419671000000000000000000000000519e9c406a7e5c6016efe687a011e6720341967100000000000000000000000000000000000000000000000000000000000000e0746573740000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000207465737400000000000000000000000000000000000000000000000000000000");
    expect(result.signature).toEqual("0xd01fe0f3209380dc28a505b4b7e86c48b923d341f845e3f3d50b3faddaa8d95152d0fed28e356f63d84378a6f2cd0dda9945b258581ab3a76a93e03d25c8fcab1c");

    const check = verifyMessage(result.functionData, result.signature);
    expect(check).toEqual(result.address);
  })
  
  it('decode data', async () => {
    const amount = 1000;
    const module = '0x519e9c406a7e5c6016efE687a011E67203419671';
    const inputToken = '0x519e9c406a7e5c6016efE687a011E67203419671';
    const owner = '0x519e9c406a7e5c6016efE687a011E67203419671';
    const witness = '0x519e9c406a7e5c6016efE687a011E67203419671';
    const data = 'test';
    const secret = 'test';
    const result: { address: string, signature: string, functionData: string } = await relayService.createCallData(amount, module, inputToken, owner, witness, data, secret);

    const decodedFalse = relayService.checkFunctionData(result.signature);
    const decodedTrue = relayService.checkFunctionData(result.functionData);
    expect(decodedFalse).toEqual(false);
    expect(decodedTrue).toEqual(true);
  })
});
