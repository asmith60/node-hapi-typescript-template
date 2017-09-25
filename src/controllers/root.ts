import {
  RouteAdditionalConfigurationOptions,
  RouteHandler,
  Request,
  ReplyNoContinue
} from 'Hapi';

export function index(): RouteAdditionalConfigurationOptions {
  return {
    description: 'This is the root of all the things.',
    handler: <RouteHandler>(request: Request, reply: ReplyNoContinue) => {
      reply({
        test: 'success'
      });
    }
  };
}
