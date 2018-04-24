import * as chai from 'chai';
import * as sinon from 'sinon';
import * as chaiAsPromised from 'chai-as-promised';
import * as Boom from 'boom';
import * as bunyan from 'bunyan';
import { config } from '../../src/config/environment';
import { logger } from '../../src/lib/Logger';

chai.use(chaiAsPromised);

describe('LoggerLib', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
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
    const spy: sinon.SinonSpy = sandbox.spy(bunyan.prototype, 'fatal');

    logger.fatal('mock log');

    chai.expect(spy.called).to.equal(true);
  });

  it('logs messages as error', () => {
    const spy: sinon.SinonSpy = sandbox.spy(bunyan.prototype, 'error');

    logger.error('mock log');

    chai.expect(spy.called).to.equal(true);
  });

  it('logs messages as info', () => {
    const spy: sinon.SinonSpy = sandbox.spy(bunyan.prototype, 'info');

    logger.info('mock log');

    chai.expect(spy.called).to.equal(true);
  });

  it('logs messages as debug', () => {
    const spy: sinon.SinonSpy = sandbox.spy(bunyan.prototype, 'debug');

    logger.debug('mock log');

    chai.expect(spy.called).to.equal(true);
  });

  it('logs messages as trace', () => {
    const spy: sinon.SinonSpy = sandbox.spy(bunyan.prototype, 'trace');

    logger.trace('mock log');

    chai.expect(spy.called).to.equal(true);
  });
});
