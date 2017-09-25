import { RouteConfiguration } from 'Hapi';
import * as Root from '../controllers/root';

export function get(): RouteConfiguration[] {
  return [{
    method: 'GET',
    path: '/',
    config: Root.index()
  }];
}
