import { PluginRegistrationObject } from 'hapi';
import Environment from './Environment';

const env: Environment = new Environment();
export default function get(): PluginRegistrationObject<any>[] {
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
