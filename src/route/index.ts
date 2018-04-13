import { ServerRoute } from 'hapi';
import * as monitor from './monitor';

export const routes: ServerRoute[] = [
  monitor.liveness,
  monitor.readiness
];
