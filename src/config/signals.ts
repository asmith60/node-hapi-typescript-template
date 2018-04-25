import { logger } from '../lib/Logger';
import { Server } from 'hapi';

export const setSignals = (server: Server) => {
  // Catch unhandled uncaught exceptions
  process.on('uncaughtException', (e: Error) => {
    logger.error('uncaughtException:');
    logger.error(e.stack);
  });

  // Catch unhandled rejected promises
  process.on('unhandledRejection', (reason: any) => {
    logger.error('unhandledRejection:');
    logger.error(reason);
  });

  // Catch system signals and gracefully stop application
  process.on('SIGINT', async () => {
    logger.setContext('shutdown');
    logger.info('Caught SIGINT. Gracefully stopping application');

    try {
      await server.stop();
    } catch (e) {
      logger.error('Unable to stop application gracefully. Forcefully killing process');
      logger.error(e.stack);
      process.exit(1);
    }
  });

  process.on('SIGTERM', async () => {
    logger.setContext('shutdown');
    logger.info('Caught SIGTERM. Gracefully stopping application');

    try {
      await server.stop();
    } catch (e) {
      logger.error('Unable to stop application gracefully. Forcefully killing process');
      logger.error(e.stack);
      process.exit(1);
    }
  });
};
