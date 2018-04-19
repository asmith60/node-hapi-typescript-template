import { logger } from '../lib/Logger';
import { Request, ResponseToolkit, ResponseObject } from 'hapi';
import { BaseHandler } from './BaseHandler';
import * as models from '../model';

class MonitorHandler extends BaseHandler {

  constructor(request: Request, h: ResponseToolkit) {
    super(request, h);
  }

  public async liveness(): Promise<ResponseObject> {
    const res: models.MonitorResponse = {
      status: true
    };
    return this.respondSuccess(this.h.response(res));
  }

  public async readiness(): Promise<ResponseObject> {
    const res: models.MonitorResponse = {
      status: true
    };
    return this.respondSuccess(this.h.response(res));
  }
}

export const liveness = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
  try {
    return await new MonitorHandler(request, h).liveness();
  } catch (e) {
    throw e;
  }
};

export const readiness = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
  try {
    return await new MonitorHandler(request, h).readiness();
  } catch (e) {
    throw e;
  }
};
