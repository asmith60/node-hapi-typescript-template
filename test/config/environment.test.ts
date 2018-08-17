import { config } from '@config/environment';
import * as chai from 'chai';

describe('EnvironmentConfig', () => {
  it('returns "0.0.0.0" if process.env.HOST is not set', () => {
    const expected: string = '0.0.0.0';

    chai.expect(config.get('host')).to.equal(expected);
  });

  it('returns 8000 if process.env.PORT is not set', () => {
    const expected: number = 8000;

    chai.expect(config.get('port')).to.equal(expected);
  });

  it('returns "http" if process.env.PROTOCOL is not set', () => {
    const expected: string = 'http';

    chai.expect(config.get('protocol')).to.equal(expected);
  });

  it('returns "info" if process.env.LOG_LEVEL is not set', () => {
    const expected: string = 'info';

    chai.expect(config.get('logLevel')).to.equal(expected);
  });

  it('returns true if process.env.ENABLE_LOGS is not set', () => {
    const expected: boolean = true;

    chai.expect(config.get('enableLogs')).to.equal(expected);
  });

  it('returns "env.json" if process.env.ENV_FILE_PATH is not set', () => {
    const expected: string = 'env.json';

    chai.expect(config.get('envFilePath')).to.equal(expected);
  });

  it('returns "node-hapi-typescript-template" if process.env.APP_NAME is not set', () => {
    const expected: string = 'blah-node-hapi-typescript-template';

    chai.expect(config.get('name')).to.equal(expected);
  });
});
