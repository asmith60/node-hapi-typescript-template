import { Environment } from './config/environment';
import { Server } from 'Hapi';
import * as Plugins from './config/plugins';
import * as Routes from './config/routes';

// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error: Error) => {
  console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on('unhandledRejection', (reason: any) => {
  console.error(`unhandledRejection ${reason}`);
});

async function main(): Promise<void> {
  const env: Environment = new Environment();

  const server: Server = new Server();

  try {
    server.connection({
      host: env.host,
      port: env.port
    });
    server.info.protocol = env.protocol;
  } catch (e) {
    console.error('Error creating server connection');
    console.error(e);
    process.exit(1);
  }

  try {
    await server.register(Plugins.get(env));
  } catch (e) {
    console.error('Error registering plugins');
    console.error(e);
    process.exit(1);
  }

  try {
    server.route(Routes.get());
  } catch (e) {
    console.error('Error creating routes');
    console.error(e);
    process.exit(1);
  }

  try {
    await server.start();
  } catch (e) {
    console.error('Error starting server');
    console.error(e);
    process.exit(1);
  }

  console.info(`Server started at: ${server.info.uri}`);
  console.info(`API docs available at: ${server.info.uri}/documentation`);
}

main();
