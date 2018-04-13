import { ServerExtEventsRequestObject } from 'hapi';
import { logger } from '../lib/Logger';

export const onRequest: ServerExtEventsRequestObject = {
  type: 'onRequest',
  method: (request, h) => {
    logger.setContext(request.info.id);
    logger.debug(`Begin: ${request.method.toUpperCase()} ${request.path}`);
    logger.debug('Metadata:');
    logger.debug(request.info);
    if (request.headers && Object.keys(request.headers).length !== 0) {
      logger.debug('Request Headers:');
      logger.debug(request.headers);
    }
    if (request.payload && Object.keys(request.payload).length !== 0) {
      logger.debug('Request Payload:');
      logger.debug(request.payload);
    }
    if (request.query && Object.keys(request.query).length !== 0) {
      logger.debug('Request Query Parameters:');
      logger.debug(request.query);
    }
    if (request.params && Object.keys(request.params).length !== 0) {
      logger.debug('Request Path Parameters:');
      logger.debug(request.params);
    }
    return h.continue;
  }
};
