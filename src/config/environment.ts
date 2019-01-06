import * as convict from 'convict';
import { existsSync } from 'fs';

const convictConfig: convict.Config<{}> = convict({
  env: {
    doc: 'Environment',
    format: String,
    default: 'development',
    env: 'NODE_ENV'
  },
  envFilePath: {
    doc: 'Path to .env file',
    format: String,
    default: 'env.json',
    env: 'ENV_FILE_PATH'
  },
  name: {
    doc: 'Name of application',
    format: String,
    default: 'node-hapi-typescript-template',
    env: 'APP_NAME'
  },
  logLevel: {
    doc: 'Bunyan log level',
    format: ['fatal', 'error', 'warn', 'info', 'debug', 'trace'],
    default: 'info',
    env: 'LOG_LEVEL'
  },
  enableLogs: {
    doc: 'Flag to turn on logging',
    format: Boolean,
    default: true,
    env: 'ENABLE_LOGS'
  },
  host: {
    doc: 'Hostname or IP address the server will listen on',
    format: String,
    default: '0.0.0.0',
    env: 'HOST'
  },
  port: {
    doc: 'Port the server will listen on',
    format: 'port',
    default: 8000,
    env: 'PORT'
  },
  protocol: {
    doc: 'Protocol used',
    format: ['http', 'https', 'socket'],
    default: 'http',
    env: 'PROTOCOL'
  }
});

if (convictConfig.get('env') === 'development' && existsSync(convictConfig.get('envFilePath'))) {
  convictConfig.loadFile(convictConfig.get('envFilePath'));
}

convictConfig.validate({ allowed: 'strict' });

export const config: convict.Config<{}> = convictConfig;
