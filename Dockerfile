FROM docker-registry.wikimedia.org/nodejs10-devel

RUN apt-get update && \
	apt-get install -y \
		ca-certificates \
		build-essential \
		python-pkgconfig \
		git

ARG UID=1000
ARG GID=1000

RUN addgroup --gid $GID runuser && adduser --uid $UID --gid $GID --disabled-password --gecos "" runuser
RUN npm install --global npm@6.14.5

USER runuser
