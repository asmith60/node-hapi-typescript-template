import { PluginRegistrationObject } from 'Hapi';
import { Environment } from './environment';

export function get(env: Environment): PluginRegistrationObject<any>[] {
  return [{
    register: require('inert')
  }, {
    register: require('vision')
  }, {
    register: require('hapi-swagger'),
    options: {
      info: {
        title: 'API Documentation',
        description: 'Description goes here',
        version: '1.0.0'
      },
      schemes: [env.protocol]
    }
  }];
}
