# FMark Dev Docker
Docker environment for FMark dev environment.

## Build the docker image

run `build.sh`

Requires `docker-entrypoint.sh` in current directory.

The command will build a docker image with 2 tags in the same repo,
__zestylogic/fmark-dev__,
* current build date and time
* "latest"

So every time `build.sh` is run, the "latest" tag will be overwritten
and a new, unique *version* number will also be generated.

Then the image can be easily published to DockerHub by
`docker push zestylogic/fmark-dev`
given the user have access to zestylogic account
(use `docker login`).


## Run the docker image

From the FMark root directory, run `start-fmark_dev_env.sh`

Now VS Code is available from your browser at [localhost:8443](https://localhost:8443).

* `docker/data` dir contains the vscode settings, extensions & session.
* `Fmark/` dir contains the project code

## Sharing additional directories

Share additional directories with your Docker vscode instance by adding the following to the `docker run` command:
```
-v $(pwd)/directory:/home/directory
```

## Dependencies included

- fsharp via the [official fsharp docker image](https://hub.docker.com/_/fsharp)
- vscode server 1.1156-vsc1.33.1. Check https://github.com/cdr/code-server/releases/latest for update.
- [nvm](https://github.com/nvm-sh/nvm) Node version manager
- [yarn](https://yarnpkg.com/lang/en/) Yarn package manager
