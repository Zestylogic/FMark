# Instructions for using Docker

## dockerfile.server (run vscode in web browser)
```
docker build -f Dockerfile.server -t fsharp-dev-server .
docker run -p 8443:8443 -dt --rm fsharp-dev-server
```
