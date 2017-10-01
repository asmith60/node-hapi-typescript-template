import { RouteConfiguration } from 'Hapi';
import * as Root from '../controllers/root';

export default function get(): RouteConfiguration[] {
  return [{
    method: 'GET',
    path: '/',
    config: Root.index()
  }];
}
