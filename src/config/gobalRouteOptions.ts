
import { RouteOptions } from 'hapi';
import * as Boom from 'boom';
import { logger } from '../lib/Logger';
import { config } from '../config/environment';
export const globalRouteOptions: RouteOptions = {
  validate: {
    failAction: async (request, h, err) => {
      logger.error('RequestValidationError:');
      logger.error(err);
      if (config.get('env') === 'production') {
        // In prod, throw the default Bad Request
        throw Boom.badRequest('Invalid request payload');
      } else {
        // During development, respond with the full error
        throw err;
      }
    }
  },
  response: {
    failAction: async (request, h, err) => {
      logger.error('ResponseValidationError:');
      logger.error(err);
      if (config.get('env') === 'production') {
        // In prod, throw the default Internal Server Error
        throw new Boom('Invalid response payload');
      } else {
        // During development, respond with the full error
        throw err;
      }
    }
  }
};
