# Instructions for using Docker

## dockerfile.server (run vscode in web browser)

### Build the docker image
`docker build -f Dockerfile.server -t fsharp-dev-server .`

Requires `docker-entrypoint.sh` in current directory.

### Run the docker image

`docker run -p 8443:8443 -dt --rm fsharp-dev-server`

Now VS Code is available from your browser at [localhost:8443](https://localhost:8443).

Share folders with your Docker vscode instance by adding the following to the `docker run` command:
```
-v $(pwd)/data:/data -v $(pwd)/code:/code 
```
