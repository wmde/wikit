# WiKit [DEPRECATED]

[![wikit-vue-components](https://img.shields.io/npm/v/@wmde/wikit-vue-components?label=wikit-vue-components)](https://www.npmjs.com/package/@wmde/wikit-vue-components)
[![wikit-tokens](https://img.shields.io/npm/v/@wmde/wikit-tokens?label=wikit-tokens)](https://www.npmjs.com/package/@wmde/wikit-tokens)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
  
[DEPRECATED] The former Wikibase Design System and home of its component implementations.

## Development

Wikit is no longer maintained. For a similar vue component library, please see [@wikimedia/codex](https://github.com/wikimedia/design-codex)

This project uses [lerna](https://lerna.js.org/) to orchestrate multiple packages.

The following examples use `docker` and `docker-compose` to ease creating a level playing field for development but they are not essential to this project.

### Installation

```sh
docker-compose run --rm --user=$(id -u):$(id -g) node npm install
```

### Running tests

```sh
docker-compose run --rm --user=$(id -u):$(id -g) node npm run test
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
