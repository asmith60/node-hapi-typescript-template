import { ServerRoute } from 'hapi';
import * as monitor from '@route/monitor';

export const routes: ServerRoute[] = [
  monitor.liveness,
  monitor.readiness
];
