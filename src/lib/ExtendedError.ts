import * as merge from 'deepmerge';

export class ExtendedError extends Error {
  options: ExtendedErrorOptions;
  constructor(message: string, options?: ExtendedErrorOptions) {
    super(message);
    if (options) {
      this.options = options;
    }
    this.name = this.constructor.name;
    this.message = message;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

export class Rethrow extends ExtendedError {
  newStack: string | undefined;
  original: Error | ExtendedError | Rethrow;
  constructor(message: string, error: Error | ExtendedError | Rethrow, options?: ExtendedErrorOptions) {
    if (!error || !message) {
      throw new Error('Rethrow requires a message and error');
    }
    const errorOptions = (<ExtendedError>error).options;
    let originalOptions: string = '';
    if (errorOptions) {
      originalOptions = JSON.stringify(errorOptions);
      if (options) {
        super(message, merge(errorOptions, options));
      } else {
        super(message, errorOptions);
      }
    } else {
      super(message);
    }
    this.original = error;
    if (originalOptions) {
      (<ExtendedError>this.original).options = JSON.parse(originalOptions);
    }
    this.newStack = this.stack;
    const messageLines: number = (this.message.match(/\n/g) || []).length + 1;
    if (this.stack) {
      this.stack = this.stack.split('\n').slice(0, messageLines + 1).join('\n') + '\n' + error.stack;
    } else {
      this.stack = error.stack;
    }
  }
}

export interface ExtendedErrorOptions {
  http?: ExtendedErrorOptionsHttp;
}

interface ExtendedErrorOptionsHttp {
  statusCode?: number;
  message?: string;
  decorate?: any;
  override?: any;
}
