import { Router, Request, Response } from 'express';
import relayService from '../../src/services/relay.service';
import { verifyMessage } from 'ethers/lib/utils';

export class Routes {
  public static initialize(router: Router): Router {
    router.post('/submit-txs', Routes.submitTransaction);

    return router;
  }

  public static async submitTransaction(_req: Request, _res: Response): Promise<void> {
    try {
      const { body } = _req;
      const { signer, signature, functionData } = body;
      const checkFunctionData = relayService.checkFunctionData(functionData);
      const verifySignature = verifyMessage(functionData, signature);

      if (!checkFunctionData) {
        _res.status(400).json({ message: "Wrong function data" });
        return;
      }

      if (verifySignature !== signer) {
        _res.status(400).json({ message: "Wrong signature" });
        return;
      }

      /**
       * @notice call RelayProxy contract
       */
    } catch (error) {
      _res.status(400).json({ message: "error" });
    }
  }
}