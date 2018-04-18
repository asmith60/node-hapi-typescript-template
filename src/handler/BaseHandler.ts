import { logger } from '../lib/Logger';
import { Request, ResponseToolkit } from 'hapi';
import * as Boom from 'boom';
import { Rethrow, ExtendedError } from '../lib/ExtendedError';

export abstract class BaseHandler {
  protected request: Request;
  protected h: ResponseToolkit;

  constructor(request: Request, h: ResponseToolkit) {
    this.request = request;
    this.h = h;
  }

  protected respondSuccess(payload) {
    return payload;
  }

  protected respondError(error?: Error | ExtendedError | Rethrow) {
    let boomError: Boom;
    if (error) {
      if (error.hasOwnProperty('options')) {
        const extendedError: ExtendedError = (<ExtendedError>error);
        if (extendedError.options && extendedError.options.http) {
          boomError = Boom.boomify(extendedError, extendedError.options.http);
        } else {
          boomError = new Boom(extendedError);
        }
      } else {
        boomError = new Boom(error);
      }
    } else {
      boomError = new Boom('Responding with unknown error');
    }
    return boomError;
  }
}
