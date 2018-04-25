import * as chai from 'chai';
import { Request, ResponseToolkit, ResponseObject } from 'hapi';
import * as Boom from 'boom';
import { config } from '../../src/config/environment';
import { ExtendedError, Rethrow } from '../../src/lib/ExtendedError';
import { BaseHandler } from '../../src/handler/BaseHandler';

describe('BaseHandler', () => {
  class MockHandler extends BaseHandler {
    constructor(request: Request, h: ResponseToolkit) {
      super(request, h);
    }

    public returnsSuccess(payload: any): ResponseObject {
      return this.respondSuccess(payload);
    }

    public returnsError(error?: Error | ExtendedError | Rethrow): Boom {
      return this.respondError(error);
    }
  }

  const mockHandler = new MockHandler(<Request>{}, <ResponseToolkit>{});

  describe('respondSuccess', () => {
    it('responds with 200 status code and correct payload', async () => {
      const value = { message: 'mock payload' };
      const expected = mockHandler.returnsSuccess(value);

      chai.expect(value).to.equal(expected);
    });
  });

  describe('respondError', () => {
    it('returns boomified plain error', async () => {
      const mockError = new Error('mock error message');
      config.set('enableLogs', false);
      const value = mockHandler.returnsError(mockError);
      config.set('enableLogs', true);
      const expected = new Boom(mockError);

      chai.expect(value).to.deep.equal(expected);
    });

    it('returns boomified extended error with http options', async () => {
      const mockError = new ExtendedError('mock error message', { http: { statusCode: 400, message: 'mock http error message' } });
      config.set('enableLogs', false);
      const value = mockHandler.returnsError(mockError);
      config.set('enableLogs', true);
      const expected = Boom.boomify(mockError, mockError.options.http);

      chai.expect(value).to.deep.equal(expected);
    });

    it('returns boomified generic error if no error is provided', async () => {
      config.set('enableLogs', false);
      const value = mockHandler.returnsError();
      config.set('enableLogs', true);
      const expected = new Boom();

      chai.expect(value.output.payload).to.deep.equal(expected.output.payload);
    });
  });
});
