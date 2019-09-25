#!/bin/bash
# if no extra parameters are passed then start VSCode
# if a parameter is passed than execute that instead
set -e

if [ $# -eq 0 ]
  then
    vscode/code-server --allow-http --no-auth --data-dir /data /code
  else
    exec "$@"
fi
