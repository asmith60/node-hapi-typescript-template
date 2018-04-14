import * as bunyan from 'bunyan';
import { config } from '../config/environment';

export class Logger {
  protected bunyanLogger: bunyan = bunyan.createLogger({
    name: config.get('name'),
    level: config.get('logLevel'),
    context: null
  });

  public setContext(context: any): void {
    this.bunyanLogger.fields.context = context;
  }

  public getContext(): any {
    return this.bunyanLogger.fields.context;
  }

  public fatal(message: any): void {
    this.bunyanLogger.fatal({ message: message });
  }

  public error(message: any): void {
    this.bunyanLogger.error({ message });
  }

  public warn(message: any): void {
    this.bunyanLogger.warn({ message });
  }

  public info(message: any): void {
    this.bunyanLogger.info({ message });
  }

  public debug(message: any): void {
    this.bunyanLogger.debug({ message });
  }

  public trace(message: any): void {
    this.bunyanLogger.trace({ message });
  }
}

export const logger = new Logger();
