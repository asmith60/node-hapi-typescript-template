# Node Hapi.js Typescript Template

[![CircleCI](https://circleci.com/gh/asmith60/node-hapi-typescript-template.svg?style=shield)](https://circleci.com/gh/asmith60/workflows/node-hapi-typescript-template)

This project is meant to be boilerplate for creating APIs in Node with [Typescript](https://www.typescriptlang.org/) and [Hapi](https://hapijs.com/). This document will explain the overall structure of the project, as well as some of the design decisions. It will also highlight some of the processes and tools used in the project.

- [Structure](#structure)
  * [config](#config)
  * [gateway](#gateway)
  * [handler](#handler)
  * [hook](#hook)
  * [lib](#lib)
  * [model](#model)
  * [repository](#repository)
  * [route](#route)
  * [service](#service)
- [Building](#building)
- [Testing](#testing)
  * [Unit](#unit)
  * [Coverage](#coverage)
  * [Lint](#lint)
  * [Security](#security)
- [Local Development](#local-development)
- [Logging](#logging)
- [Docker](#docker)
- [CI](#ci)
- [IDE Integration](#ide-integration)
  * [Formatting](#formatting)
  * [Linting](#linting)
  * [Debugging](#debugging)

## Structure

The project utilizes a modified form of the traditional controller --> service --> repository architecture. Below is a brief description of the sub-directories under [src](src).

### [config](src/config)

Houses the application's configuration. The [environment.ts](src/config/environment.ts) file is where environment variables are centralized and constructed into a unified global configuration object (uses [node-convict](https://github.com/mozilla/node-convict)). If the `NODE_ENV` environment variable is set to `development` (the default) then the application will attempt to load extra configuration values from a file named `env.json` in the root of the project. This is useful for easily injecting configuration values into the application during development.

### [gateway](src/gateway)

Much like a repository, but instead of abstracting persistence it abstracts an API.

### [handler](src/handler)

A handler is where the API request first lands when it hits the application. In this architecture handlers take the place of controllers. Ideally a handler only includes "application" logic. "Business" logic is the provenance of the service. The handler also serves as the "break" between the framework and our underlying code.

### [hook](src/hook)

Hooks are a framework feature of [Hapi](https://hapijs.com/). They allow us to intercept the request/repsonse during its lifecycle and perform logic/modifications. In the context of this template they are used exclusively for logging. You can read more about them [here](https://hapijs.com/api#request-lifecycle)

### [lib](src/lib)

A sort of umbrella for shared modules of code that don't belong in any of the other directories.

### [model](src/model)

There are two types of models for this template: [Joi](https://github.com/hapijs/joi) models and Typescript interfaces. [Joi](https://github.com/hapijs/joi) is a Node.js validation library written to be used with [Hapi](https://hapijs.com/). It is a very robust and convenient solution for request/repsponse validation. Typescript interfaces describe the structure and type of entities in our code. There is some obvious overlap/duplication between the two tools, but that is balanced by the benefit they provide.

### [repository](src/repository)

An abstraction over your persistence layer.

### [route](src/route)

Configuration for API endpoints. The definition of a route is dicated by [Hapi](https://hapijs.com/). See [here](https://hapijs.com/api#-serverrouteroute) for more details.

### service(src/service)

The middleware between handler and repository/gateway. Performs business logic and orchestrates the request.

## Building

```bash
npm run build
```

[Webpack](https://webpack.js.org/) is used to compile/bundle the application. Webpack's main configuration file is [webpack.config.js](webpack.config.js). If the `NODE_ENV` environment variable is set to `production`, Webpack will bundle the application in "production" mode (minify, uglify, etc), otherwise it will skip the extra "production" bundling steps. Webpack places the bundled application in the `dist` directory. A quick note on Webpack and external dependencies (node_modules): You can have Webpack bundle your dependencies in with your application. This helps tree-shake your application code and keep your bundle size small. However, in many cases it is also a more complex build configuration. For this reason the template does not bundle external dependencies with the app, but rather assumes that the dependencies exist outside the app. If for some reason you are concerned about the bundle size, consider performing the extra configuration to bundle external dependencies.

## Testing

Run all available tests

```bash
npm run test:all
```

### Unit

```bash
npm run test
```

Unit tests are located in the [test](test) directory. The [Mocha](https://mochajs.org/) test runner, [Chai](http://www.chaijs.com/) assertion library, and [Sinon](http://sinonjs.org/) mock/stub library are used to perform unit tests. [Mocha-webpack](https://github.com/zinserjan/mocha-webpack) library  is used to build/compile our tests. Its main configuration files are [mocha-webpack.opts](mocha-weback.opts) and [webpack.config.test.js](webpack.config.test.js).

### Coverage

```bash
npm run test:coverage
```

The [Istanbul](https://istanbul.js.org/) library is used to calculate and check test coverage. Its main configuration file is [.nycrc](.nycrc). Istanbul is currently calculating and displaying test coverage, but not failing builds for low test coverage. To start failing builds for test coverage thresholds, toggle the `check-coverage` property in [.nycrc](.nycrc) to be `true`.

### Lint

```bash
npm run test:lint
```

[TSLint](https://palantir.github.io/tslint/) is used for linting. Its main configuration file is [tslint.json](tslint.json)

### Security

```bash
npm run test:security
```

[Node Security Platform](https://nodesecurity.io/) is used to scan the application's external dependencies (node_modules) for known vulnerabilities. Its main configuration file is [.nsprc](.nsprc).

## Local Development

Build and start the application

```bash
npm run dev
```

Build and start the application and reload when a change is detected

```bash
npm run dev:watch
```

## Logging

[Bunyan](https://github.com/trentm/node-bunyan) is used for logging. All logs are written to stdout. The log level is configured with the `LOG_LEVEL` environment variable (default is 'info'). There is also a convenience configuration to turn off logging completely (mostly used during testing to avoid spurious logging). Toggle this config by setting the `ENABLE_LOGS` environment variable to `true` or `false` (default is `true`). Bunyan formats logs into a JSON structure that is easily parsed by a log aggregator (SumoLogic). For local development, I have configured Bunyan to write logs in a more human readable format using [bunyan-debug-stream](https://github.com/benbria/bunyan-debug-stream). Logs are written in the human readable format if the `NODE_ENV` environment variable is set to `development` (the default) or `unit_test`, otherwise logs are written in JSON format.

## Docker

Run application locally in [Docker](https://www.docker.com/)

```bash
npm run docker
```

Build Docker image

```bash
npm run docker:build
```

Push Docker image

```bash
npm run docker:push
```

Must have Docker installed to run the above commands.

## CI

This template is configured to use [CircleCI](https://circleci.com/). All tests are configured to write their results to the `artifacts` directory. The CircleCI workflow is configured to upload this directory as a pipeline artifact.

## IDE Integration

### Formatting

[Editorconfig](http://editorconfig.org/) is used to unify code formatting (indention, spacing, etc) among multiple developers. Editorconfig is supported by many popular IDEs. For [VSCode](https://code.visualstudio.com/) you can download the extension [here](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig).

### Linting

[TSLint](https://palantir.github.io/tslint/) is used for linting. For [VSCode](https://code.visualstudio.com/) you can download the extension [here](https://marketplace.visualstudio.com/items?itemName=eg2.tslint).

### Debugging

This template is configured to use the debugging features in [VSCode](https://code.visualstudio.com/). There are runtime options to launch your application when debugging: "Launch in Node" and "Launch in Docker". Both work as expected and require that Node and Docker respectively be installed on the system. All of the configuration necessary to set this up is in the [.vscode](.vscode) directory.
