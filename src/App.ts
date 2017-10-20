import Environment from './config/Environment';
import Plugins from './config/Plugins';
import Routes from './config/Routes';
import { Server } from 'Hapi';

// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error: Error) => {
  console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on('unhandledRejection', (reason: any) => {
  console.error(`unhandledRejection ${reason}`);
});

const env: Environment = new Environment();

const server: Server = new Server();

async function main(): Promise<void> {
  try {
    server.connection({
      host: env.host,
      port: env.port
    });
    server.info.protocol = env.protocol;
  } catch (e) {
    console.error('Error: Creating server connection');
    throw e;
  }

  try {
    await server.register(Plugins());
  } catch (e) {
    console.error('Error: Registering plugins');
    throw e;
  }

  try {
    server.route(Routes());
  } catch (e) {
    console.error('Error: Creating routes');
    throw e;
  }

  try {
    await server.start();
  } catch (e) {
    console.error('Error: Starting server');
    throw e;
  }
}

// Execute main function
main().then(() => {
  console.info(`Server started at: ${server.info.uri}`);
  console.info(`API docs available at: ${server.info.uri}/documentation`);
}).catch((e) => {
  console.error(e.message);
  console.error(e.stack);
  process.exit(1);
});
