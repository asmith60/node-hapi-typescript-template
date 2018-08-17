import { logger } from '@lib/Logger';
import { Request, ResponseToolkit, ResponseObject } from 'hapi';
import * as Boom from 'boom';
import { Rethrow, ExtendedError } from '@lib/ExtendedError';

export abstract class BaseHandler {
  protected request: Request;
  protected h: ResponseToolkit;

  constructor(request: Request, h: ResponseToolkit) {
    this.request = request;
    this.h = h;
  }

  protected respondSuccess(response: ResponseObject): ResponseObject {
    return response;
  }

  protected respondError(error?: Error | ExtendedError | Rethrow): Boom {
    if (!error) {
      return new Boom();
    }

    logger.debug('Full Error Object:');
    logger.debug(error);

    if (error.stack) {
      logger.error('Error Stack:');
      logger.error(error.stack);
    } else {
      logger.error('No Error stack to log');
    }

    if (error.hasOwnProperty('options') && (<ExtendedError>error).options.http) {
      return Boom.boomify(error, (<ExtendedError>error).options.http);
    }

    return new Boom(error);
  }
}
