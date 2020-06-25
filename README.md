# wikit
The Wikibase Design System and home of WMDE-supported component implementations.

## Development

The following examples use `docker` and `docker-compose` to ease creating a level playing field for development but they are not essential to this project.

### Building the Docker image

```sh
# ensure the node user uses your user id, so you own created files
docker-compose build --build-arg UID=$(id -u) --build-arg GID=$(id -g) node
```

### Installation

This project uses [lerna](https://lerna.js.org/) to orchestrate multiple packages.
The following steps assume you have lerna installed. (As done, globally, in the provided Dockerfile).

```sh
docker-compose run --rm node lerna bootstrap
```

Alternatively, you can run

```sh
docker-compose run --rm node npm install
```

which will also invoke lerna.

### Run tests

You can invoke tests from the root level via 

```sh
docker-compose run --rm node npm test
```

or on the individual package level (assuming proper installation was had before), e.g.

```
docker-compose run --rm node npm /bin/bash
cd packages/tokens
npm test
```

### Start storybook

```sh
docker-compose up storybook
```
