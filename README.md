# Node.js Hapi Typescript API Template

[![CircleCI](https://circleci.com/gh/asmith60/node-hapi-typescript-template.svg?style=svg&circle-token=8ba515a469d30547cb26130b857ba1cc2f0ef4bf)](https://circleci.com/gh/asmith60/workflows/node-hapi-typescript-template) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This project is meant to be boilerplate for creating APIs in Node. This document will explain the overall structure of the project, as well as some of the design decisions. It will also highlight some of the processes and tools used in the project.

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
  * [App.ts](#appts)
- [Building](#building)
- [Testing](#testing)
  * [Unit](#unit)
  * [Coverage](#coverage)
  * [Lint](#lint)
  * [Security](#security)
- [Configuration](#configuration)
  * [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [Logging](#logging)
- [API Documentation](#api-documentation)
- [Docker](#docker)
- [Semantic Releases](#semantic-releases)
  * [Commit Messages](#commit-messages)
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

A handler is where the API request first lands when it hits the application. In this architecture handlers take the place of controllers. Ideally a handler only includes "application" logic. "Business" logic is the provenance of the service. The handler also serves as the "break" between the framework and the underlying code.

### [hook](src/hook)

Hooks are a framework feature of [Hapi](https://hapijs.com/). They allow us to intercept the request/response during its lifecycle and perform logic/modifications. In the context of this template they are used exclusively for logging. You can read more about them [here](https://hapijs.com/api#request-lifecycle)

### [lib](src/lib)

A sort of umbrella for shared modules of code that don't belong in any of the other directories.

### [model](src/model)

There are two types of models for this template: [Joi](https://github.com/hapijs/joi) models and Typescript interfaces. [Joi](https://github.com/hapijs/joi) is a Node.js validation library written to be used with [Hapi](https://hapijs.com/). It is a very robust and convenient solution for request/response validation. Typescript interfaces describe the structure and type of entities in the code. There is some obvious overlap/duplication between the two tools, but that is balanced by the benefit they provide.

### [repository](src/repository)

An abstraction over your persistence layer.

### [route](src/route)

Configuration for API endpoints. The definition of a route is dicated by [Hapi](https://hapijs.com/). See [here](https://hapijs.com/api#-serverrouteroute) for more details.

### [service](src/service)

The middleware between handler and repository/gateway. Performs business logic and orchestrates the request.

### [App.ts](src/App.ts)

Entrypoint for the application. Starts server, registers routes, loads plugins, etc.

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

Unit tests are located in the [test](test) directory. The [Mocha](https://mochajs.org/) test runner, [Chai](http://www.chaijs.com/) assertion library, and [Sinon](http://sinonjs.org/) mock/stub library are used to perform unit tests. I use the [Mocha-webpack](https://github.com/zinserjan/mocha-webpack) library to build/compile tests. Its main configuration files are [mocha-webpack.opts](mocha-weback.opts) and [webpack.config.test.js](webpack.config.test.js).

### Coverage

```bash
npm run test:coverage
```

The [Istanbul](https://istanbul.js.org/) library is used to calculate and check test coverage. Its main configuration file is [.nycrc](.nycrc). I have configured Istanbul to calculate and display test coverage, but not fail builds for low test coverage. To start failing builds for test coverage thresholds, toggle the `check-coverage` property in [.nycrc](.nycrc) to be `true`.

### Lint

```bash
npm run test:lint
```

[TSLint](https://palantir.github.io/tslint/) is used for linting. Its main configuration file is [tslint.json](tslint.json)

### Security

```bash
npm run test:security
```

[npm audit](https://docs.npmjs.com/cli/audit) is used to scan the application's external dependencies (node_modules) for known vulnerabilities. The test saves its results as a CI artifact, but _does not_ fail the build. This is due to a limitation of `npm audit` not allowing exceptions for vulnerabilities.

## Configuration

### Environment Variables

| Key           | Description   | Default Value |
| ------------- |:-------------:| --------------|
| APP_NAME | Name of application | 'node-hapi-typescript-template' |
| ENABLE_LOGS | Flag to enable/disbale logging | true |
| ENV_FILE_PATH | Path to file with extra environmental configuration values - [reference](https://github.com/mozilla/node-convict#configloadfilefile-or-filearray) | _project_root_/env.json |
| HOST | Hostname or IP address the server will listen on | '0.0.0.0' |
| LOG_LEVEL | Log level for application ('info', 'debug', etc) | 'info' |
| NODE_ENV | Environment where application is running | 'development' |
| PORT | Port the server will listen on | 8000 |
| PROTOCOL | PROTOCOL used, must be one of ['http', 'https', 'socket'] | 'http' |

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

[Bunyan](https://github.com/trentm/node-bunyan) is used for logging. All logs are written to stdout. The log level is configured with the `LOG_LEVEL` environment variable (default is 'info'). There is also a convenience configuration to turn off logging completely (mostly used during testing to avoid spurious logging). Toggle this config by setting the `ENABLE_LOGS` environment variable to `true` or `false` (default is `true`). Bunyan formats logs into a JSON structure that is easily parsed by a log aggregator. For local development, I have configured Bunyan to write logs in a more human readable format using [bunyan-debug-stream](https://github.com/benbria/bunyan-debug-stream). Logs are written in the human readable format if the `NODE_ENV` environment variable is set to `development` (the default) or `unit_test`, otherwise logs are written in JSON format.

## API Documentation

The [hapi-swagger](https://github.com/glennjones/hapi-swagger) library is used to generate Swagger API documentation with the information in the route configuration (path, method, request/response schema, etc). The documentation can be accessed via the application at `/documentation`.

## Docker

Run application locally in Docker

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

## Semantic Releases

This template follows [SemVer](https://semver.org/). The [semantic-release](https://github.com/semantic-release/semantic-release) library is used to manage version numbers, cut GitHub releases, and create/update the [changelog](CHANGELOG.md)

### Commit Messages

This template follows the commit message guidlines outlined by the [Angular project](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines). The commit message format determines the release number and is enforced with a [pre-commit hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) (implemented via [husky](https://github.com/typicode/husky)). Here is an example of the release type that will be created based on the commit messages:

| Commit message                                                                                                                                                                                   | Release type               |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|
| `fix(pencil): stop graphite breaking when too much pressure applied`                                                                                                                             | Patch Release              |
| `feat(pencil): add 'graphiteWidth' option`                                                                                                                                                       | ~~Minor~~ Feature Release  |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release |

## CI

This template is configured to use [CircleCI](https://circleci.com/). All tests are configured to write their results to the `artifacts` directory. The CircleCI workflow is configured to upload this directory as a pipeline artifact.

## IDE Integration

### Formatting

[Editorconfig](http://editorconfig.org/) is used to unify code formatting (indention, spacing, etc) among multiple developers. Editorconfig is supported by many popular IDEs. For [VSCode](https://code.visualstudio.com/) you can download the extension [here](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig).

### Linting

[TSLint](https://palantir.github.io/tslint/) is used for linting. For [VSCode](https://code.visualstudio.com/) you can download the extension [here](https://marketplace.visualstudio.com/items?itemName=eg2.tslint).

### Debugging

This template is configured to use the debugging features in [VSCode](https://code.visualstudio.com/). There are runtime options to launch your application when debugging: "Launch in Node" and "Launch in Docker". Both work as expected and require that Node and Docker respectively be installed on the system. All of the configuration necessary to set this up is in the [.vscode](.vscode) directory.
