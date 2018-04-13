import { ServerExtEventsRequestObject } from 'hapi';
import { onRequest } from './onRequest';
import { onPreResponse } from './onPreResponse';

export const hooks: ServerExtEventsRequestObject[] = [
  onRequest,
  onPreResponse
];
