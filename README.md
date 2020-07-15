# wikit
The Wikibase Design System and home of WMDE-supported component implementations.

## Development

The following examples use `docker` and `docker-compose` to ease creating a level playing field for development but they are not essential to this project.

### Building the Docker image

```sh
# ensure the node user uses your user id, so you own created files
docker-compose build --build-arg UID=$(id -u) --build-arg GID=$(id -g) node
```

### Running npm

```sh
docker-compose run --rm node npm
```

### Installation

This project uses [lerna](https://lerna.js.org/) to orchestrate multiple packages.

```sh
docker-compose run --rm node lerna bootstrap
```

### Running tests

```sh
docker-compose run --rm node lerna run test
```

### Running Storybook

```sh
docker-compose up storybook
```
