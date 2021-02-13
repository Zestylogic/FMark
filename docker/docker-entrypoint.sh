#!/bin/bash
# if no extra parameters are passed then start VSCode
# if a parameter is passed than execute that instead
set -e

# Add local user
# Either use the LOCAL_USER_ID if passed in at runtime or fallback
USER_ID=${LOCAL_USER_ID:-9001}
echo "Starting with UID : $USER_ID"
useradd --shell /bin/bash -u $USER_ID -o -c "" -m dockeruser

if [ $# -eq 0 ]
  then
    gosu dockeruser /usr/local/bin/vscode/code-server --allow-http --no-auth \
      --user-data-dir /home/dockeruser/data /home/dockeruser/code
  else
    exec gosu dockeruser "$@"
fi
