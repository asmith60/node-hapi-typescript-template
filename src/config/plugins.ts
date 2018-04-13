import { ServerRegisterPluginObject } from 'hapi';
import { config } from './environment';

export const plugins: ServerRegisterPluginObject<any>[] = [
  {
    plugin: require('inert')
  }, {
    plugin: require('vision')
  }, {
    plugin: require('hapi-swagger'),
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
