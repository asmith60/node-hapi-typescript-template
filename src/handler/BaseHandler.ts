import { logger } from '../lib/Logger';
import { Request, ResponseToolkit } from 'hapi';

export abstract class BaseHandler {
  protected request: Request;
  protected h: ResponseToolkit;

  constructor(request: Request, h: ResponseToolkit) {
    this.request = request;
    this.h = h;
  }
}
