import * as chai from 'chai';
import * as sinon from 'sinon';
import * as chaiAsPromised from 'chai-as-promised';
import * as bunyan from 'bunyan';
import { config } from '@config/environment';
import { logger } from '@lib/Logger';

chai.use(chaiAsPromised);

describe('LoggerLib', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('gets and sets context', () => {
    const context: string = 'mock context';

    logger.setContext(context);

    chai.expect(logger.getContext()).to.equal(context);

    logger.setContext(null);
  });

  it('logs messages as fatal', () => {
    const stub: sinon.SinonStub = sandbox.stub(bunyan.prototype, 'fatal');

    logger.fatal('mock log');

    chai.expect(stub.called).to.equal(true);
  });

  it('logs messages as error', () => {
    const stub: sinon.SinonStub = sandbox.stub(bunyan.prototype, 'error');

    logger.error('mock log');

    chai.expect(stub.called).to.equal(true);
  });

  it('logs messages as info', () => {
    const stub: sinon.SinonStub = sandbox.stub(bunyan.prototype, 'info');

    logger.info('mock log');

    chai.expect(stub.called).to.equal(true);
  });

  it('logs messages as debug', () => {
    const stub: sinon.SinonStub = sandbox.stub(bunyan.prototype, 'debug');

    logger.debug('mock log');

    chai.expect(stub.called).to.equal(true);
  });

  it('logs messages as trace', () => {
    const stub: sinon.SinonStub = sandbox.stub(bunyan.prototype, 'trace');

    logger.trace('mock log');

    chai.expect(stub.called).to.equal(true);
  });
});
