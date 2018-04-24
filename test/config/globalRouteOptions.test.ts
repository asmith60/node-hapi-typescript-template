import * as chai from 'chai';
import * as sinon from 'sinon';
import * as chaiAsPromised from 'chai-as-promised';
import { Request, ResponseToolkit, RouteOptionsValidate } from 'hapi';
import * as Boom from 'boom';
import { config } from '../../src/config/environment';
import { globalRouteOptions } from '../../src/config/gobalRouteOptions';

chai.use(chaiAsPromised);

describe('GlobalRouteOptionsConfig', () => {
  let sandbox: sinon.SinonSandbox;

  before(() => {
    config.set('enableLogs', false);
  });

  after(() => {
    config.set('enableLogs', true);
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
    config.set('env', 'unit_test');
  });

  describe('ValidateFailAction', () => {
    it('fail action throws full error if env is development', () => {
      const expected: Error = new Error('Mock error message');

      const value = <any>(globalRouteOptions.validate!.failAction);

      return chai.expect(value({}, {}, expected)).to.be.rejectedWith(expected);
    });

    it('fail action throws generic bad request if env is production', async () => {
      const spy = sandbox.spy(Boom, 'badRequest');

      const value = <any>(globalRouteOptions.validate!.failAction);

      config.set('env', 'production');

      await chai.expect(value({}, {}, new Error('Should not be thrown'))).to.be.rejected;
      chai.expect(spy.calledOnce).to.equal(true);
    });
  });

  describe('ResponseFailAction', () => {
    it('fail action throws full error if env is development', () => {
      const expected: Error = new Error('Mock error message');

      const value = <any>(globalRouteOptions.response!.failAction);

      return chai.expect(value({}, {}, expected)).to.be.rejectedWith(expected);
    });

    it('fail action throws generic bad request if env is production', async () => {
      const spy = sandbox.spy(Boom, 'boomify');

      const value = <any>(globalRouteOptions.response!.failAction);

      config.set('env', 'production');

      await chai.expect(value({}, {}, new Error('Should not be thrown'))).to.be.rejected;
      chai.expect(spy.calledOnce).to.equal(true);
    });
  });
});
