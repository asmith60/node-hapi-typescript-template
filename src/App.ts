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
    throw Error(`Creating server connection: ${e.stack}`);
  }

  try {
    await server.register(Plugins());
  } catch (e) {
    throw Error(`Registering plugins: ${e.stack}`);
  }

  try {
    server.route(Routes());
  } catch (e) {
    throw Error(`Creating routes: ${e.stack}`);
  }

  try {
    await server.start();
  } catch (e) {
    throw Error(`Starting server: ${e.stack}`);
  }
}

// Execute main function
main().then(() => {
  console.info(`Server started at: ${server.info.uri}`);
  console.info(`API docs available at: ${server.info.uri}/documentation`);
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
