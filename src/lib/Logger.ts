import * as bunyan from 'bunyan';
import * as bunyanDebugStream from 'bunyan-debug-stream';
import { config } from '../config/environment';

export class Logger {
  protected bunyanLogger: bunyan;

  constructor(env: string) {
    let bunyanLoggerOptions: bunyan.LoggerOptions;

    if (env === 'development') {
      bunyanLoggerOptions = {
        name: config.get('name'),
        level: config.get('logLevel'),
        context: null,
        streams: [{
          level: config.get('logLevel'),
          type: 'raw',
          stream: bunyanDebugStream({
            basepath: '..',
            forceColor: true,
            stringifiers: {
              message: (message) => {
                let output: string;
                if (message && typeof message === 'object') {
                  output = JSON.stringify(message, null, 2);
                } else {
                  output = message;
                }
                return `${output}`;
              }
            }
          })
        }],
        serializers: bunyanDebugStream.serializers
      };
    } else {
      bunyanLoggerOptions = {
        name: config.get('name'),
        level: config.get('logLevel'),
        context: null
      };
    }

    this.bunyanLogger = bunyan.createLogger(bunyanLoggerOptions);
  }
  public setContext(context: any): void {
    this.bunyanLogger.fields.context = context;
  }

  public getContext(): any {
    return this.bunyanLogger.fields.context;
  }

  public fatal(message: any): void {
    this.bunyanLogger.fatal({ message });
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

export const logger = new Logger(config.get('env'));
