import { ServerRoute } from 'hapi';
import * as monitor from '@handler/MonitorHandler';
import * as joiModels from '@model/joi';

export const liveness: ServerRoute = {
  method: 'GET',
  path: '/monitor/liveness',
  handler: monitor.liveness,
  options: {
    description: 'Tests the application\'s "liveness"',
    tags: ['api'],
    response: {
      schema: joiModels.monitorResponse
    }
  }
};

export const readiness: ServerRoute = {
  method: 'GET',
  path: '/monitor/readiness',
  handler: monitor.readiness,
  options: {
    description: 'Tests the application\'s "readiness"',
    tags: ['api'],
    response: {
      schema: joiModels.monitorResponse
    }
  }
};
