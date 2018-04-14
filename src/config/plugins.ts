import { ServerRegisterPluginObject } from 'hapi';
import { config } from './environment';
import * as hapiSwagger from 'hapi-swagger';
import * as inert from 'inert';
import * as vision from 'vision';

export const plugins: ServerRegisterPluginObject<any>[] = [
  {
    plugin: vision
  },
  {
    plugin: inert
  },
  {
    plugin: hapiSwagger,
    options: {
      info: {
        title: 'API Documentation',
        description: 'Description goes here',
        version: '1.0.0'
      },
      schemes: [config.get('protocol')]
    }
  }
];
