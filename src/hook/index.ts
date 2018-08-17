import { ServerExtEventsRequestObject } from 'hapi';
import { onRequest } from '@hook/onRequest';
import { onPreResponse } from '@hook/onPreResponse';

export const hooks: ServerExtEventsRequestObject[] = [
  onRequest,
  onPreResponse
];
