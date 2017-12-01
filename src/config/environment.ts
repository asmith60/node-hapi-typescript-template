import { ServerConnectionInfo } from 'hapi';

export default class Environment {
  host: string;
  port: number;
  protocol: ServerConnectionInfo['protocol'];

  constructor() {
    this.host = process.env.HOST || '0.0.0.0';
    this.port = parseInt(process.env.PORT!, 10) || 8000;
    this.protocol = <ServerConnectionInfo['protocol']>process.env.PROTOCOL || 'http';
    if (['http', 'https', 'socket'].indexOf(this.protocol) < 0) {
      throw new Error(`Unsupported protocol "${this.protocol}"`);
    }
  }
}
