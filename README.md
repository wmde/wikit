# WiKit
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
  
[![github](https://github.com/wmde/wikit/workflows/Build%20and%20Deploy%20documentation/badge.svg)](https://wmde.github.io/wikit/)
[![github](https://github.com/wmde/wikit/workflows/Test%20and%20Deploy/badge.svg)](https://www.chromatic.com/builds?appId=5efdb3b5f65950002286285d)

[![Sauce Test Status](https://app.saucelabs.com/buildstatus/wikit)](https://app.saucelabs.com/u/wikit)

[![Sauce Test Status](https://app.saucelabs.com/browser-matrix/wikit.svg)](https://app.saucelabs.com/u/wikit)

The Wikibase Design System and home of WMDE-supported component implementations.

## Development

This project uses [lerna](https://lerna.js.org/) to orchestrate multiple packages.

The following examples use `docker` and `docker-compose` to ease creating a level playing field for development but they are not essential to this project.

### Installation

```sh
docker-compose run --rm --user=$(id -u):$(id -g) --entrypoint "npm install" node
```

### Running tests

```sh
docker-compose run --rm --user=$(id -u):$(id -g) --entrypoint "npm run test" node
```

### Running browser tests

#### Local

To run browser tests locally make sure `storybook-vue` is up and running.

##### In Docker

```sh
docker-compose -f docker-compose.yml -f docker-compose.browsertests.yml up browsertests
```

Note: If you were not already running the main docker-compose services your tests may fail their first run as things are still being built.

##### On the host machine

Navigate to `vue-components` subdirectory and run it with your storybook URL specified:

```sh
STORYBOOK_URL=localhost:6005 npm run e2e
```

#### Cross-browser testing

The cross browser tests for the `vue-components` package run on [Saucelabs](https://saucelabs.com/). To see the test results on Saucelabs you need an account. If you don't have one, please contact your manager.

The cross browser tests run in CI against the vue storybook built on that branch and deployed to Netlify.
The url is dynamic and changes for each branch. That's why you cannot run Saucelabs tests from your machine.

### Running Storybook

The following command starts two storybooks

* the storybook of the docs package - the Design System incl. documentation and tokens, on `DOCS_STORYBOOK_PORT`¹
* the storybook of the vue-components package - an inventory of the component library, on `VUECOMPONENTS_STORYBOOK_PORT`¹

```sh
docker-compose up
```

ℹ In development mode, the storybooks currently do **not** support "composition", i.e. vue-components is not featured in the docs storybook. Please look at it in isolation.

¹ Please refer to the `.env` file(s) for port configuration.

As usual, docker-compose also allows for those services to be started independently of each other if preferred.

### Automatically rebuilding tokens on source file changes

Run the following command to automatically rebuild the tokens in all output formats during development when changing one of the json source files:

```sh
docker-compose run --rm --user=$(id -u):$(id -g) node npm run -- lerna run watch --stream
```

This way you don't have to manually run the `build:tokens` command for every token change.
