import { Environment } from '../../config/environment';
import { assert } from 'chai';

describe('Config', () => {
  describe('Environment', () => {
    beforeEach(() => {
      delete process.env.HOST;
      delete process.env.PORT;
      delete process.env.PROTOCOL;
    });
    afterEach(() => {
      delete process.env.HOST;
      delete process.env.PORT;
      delete process.env.PROTOCOL;
    });
    it('should return "0.0.0.0" if process.env.HOST is not set', () => {
      const env = new Environment();

      const expected: string = '0.0.0.0';

      assert.equal(env.host, expected);
    });

    it('should return 8000 if process.env.PORT is not set', () => {
      const env = new Environment();

      const expected: number = 8000;

      assert.equal(env.port, expected);
    });

    it('should return "http" if process.env.PROTOCOL is not set', () => {
      const env = new Environment();

      const expected: string = 'http';

      assert.equal(env.protocol, expected);
    });

    it('should return process.env.HOST if process.env.HOST is set', () => {
      process.env.HOST = 'my.test.host';

      const env: Environment = new Environment();

      const expected: string = process.env.HOST;

      assert.equal(env.host, expected);
    });

    it('should return process.env.PORT if process.env.PORT is set', () => {
      process.env.PORT = '8080';

      const env: Environment = new Environment();

      const expected: number = 8080;

      assert.equal(env.port, expected);
    });

    it('should return process.env.PROTOCOL if process.env.PROTOCOL is set', () => {
      process.env.PROTOCOL = 'https';

      const env: Environment = new Environment();

      const expected: string = process.env.PROTOCOL;

      assert.equal(env.protocol, expected);
    });

    it('should throw an Error if process.env.PROTOCOL is set to anything but "http", "https", or "socket"', () => {
      process.env.PROTOCOL = 'invalid';

      assert.throw(() => {
        new Environment();
      },           Error);
    });
  });
});
