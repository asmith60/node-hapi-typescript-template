class ExtendedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

export class RethrownError extends ExtendedError {
  newStack: string | undefined;
  original: Error;
  constructor(message: string, error: Error) {
    super(message);
    if (!error) throw new Error('RethrownError requires a message and error');
    this.original = error;
    this.newStack = this.stack;
    const messageLines: number = (this.message.match(/\n/g) || []).length + 1;
    if (this.stack) {
      this.stack = this.stack.split('\n').slice(0, messageLines + 1).join('\n') + '\n' + error.stack;
    } else {
      this.stack = error.stack;
    }
  }
}
