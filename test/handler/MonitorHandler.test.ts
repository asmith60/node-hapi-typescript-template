import * as models from '../../src/model';
import { Request, ResponseToolkit } from 'hapi';
import { expect } from 'chai';
import * as monitorHandler from '../../src/handler/MonitorHandler';

describe('MonitorHandler', () => {
  describe('liveness', () => {
    it('resolves with true status', async () => {
      const value: models.MonitorResponse = await monitorHandler.liveness(<Request>{}, <ResponseToolkit>{});
      const expected: models.MonitorResponse = {
        status: true
      };

      expect(value).to.deep.equal(expected);
    });
  });

  describe('readiness', () => {
    it('resolves with true status', async () => {
      const value: models.MonitorResponse = await monitorHandler.readiness(<Request>{}, <ResponseToolkit>{});
      const expected: models.MonitorResponse = {
        status: false
      };

      expect(value).to.deep.equal(expected);
    });
  });
});
