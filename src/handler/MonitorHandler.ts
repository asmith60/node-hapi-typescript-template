import { logger } from '../lib/Logger';
import { Request, ResponseToolkit } from 'hapi';
import { BaseHandler } from './BaseHandler';
import * as models from '../model';

class MonitorHandler extends BaseHandler {

  constructor(request: Request, h: ResponseToolkit) {
    super(request, h);
  }

  public async liveness(): Promise<models.MonitorResponse> {
    return {
      status: true
    };
  }

  public async readiness(): Promise<models.MonitorResponse> {
    return {
      status: true
    };
  }
}

export const liveness = async (request: Request, h: ResponseToolkit): Promise<models.MonitorResponse> => {
  try {
    return new MonitorHandler(request, h).liveness();
  } catch (e) {
    throw e;
  }
};

export const readiness = async (request: Request, h: ResponseToolkit): Promise<models.MonitorResponse> => {
  try {
    return new MonitorHandler(request, h).readiness();
  } catch (e) {
    throw e;
  }
};
