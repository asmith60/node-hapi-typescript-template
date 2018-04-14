import { ServerExtEventsRequestObject, ResponseObject } from 'hapi';
import { logger } from '../lib/Logger';

export const onPreResponse: ServerExtEventsRequestObject = {
  type: 'onPreResponse',
  method: (request, h) => {
    if (request.response && (<any>request.response).isBoom) {
      const response: any = <any>request.response;
      if (response.output && response.output.payload && Object.keys(response.output.payload).length !== 0) {
        logger.debug(`Error Response Payload:`);
        logger.debug(response.output.payload);
      }
      if (response.output && response.output.headers && Object.keys(response.output.headers).length !== 0) {
        logger.debug(`Error Response Headers:`);
        logger.debug(response.output.headers);
      }
      if ((<any>request.response).output && (<any>request.response).output.statusCode) {
        logger.debug(`Error Response Status Code:`);
        logger.debug(response.output.statusCode);
      }
    } else {
      const response: ResponseObject = <ResponseObject>request.response;
      if (response.source) {
        logger.debug('Response Payload:');
        logger.debug(response.source);
      }
      if (response.headers && Object.keys(response.headers).length !== 0) {
        logger.debug('Response Headers:');
        logger.debug(response.headers);
      }
      if (response.statusCode) {
        logger.debug('Response Status Code:');
        logger.debug(response.statusCode);
      }
    }
    if (request.path !== '/monitor/liveness' && request.path !== '/monitor/readiness' && !request.path.includes('swagger')) {
      logger.info(`End: ${request.method.toUpperCase()} ${request.path}`);
    } else {
      logger.debug(`End: ${request.method.toUpperCase()} ${request.path}`);
    }
    return h.continue;
  }
};
