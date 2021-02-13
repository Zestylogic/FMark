#!/usr/bin/env bash

# not using -d because the user might not aware the server is still running after
# a long hacking session
# plus detaching does not give the user console output from the container which
# might be useful
# option -i, interactive, so that Ctrl+C can be received by the container, therefore
# exiting the container, and trigger --rm action
# option -t. provide tty
docker run -it --rm -p 8443:8443 -e LOCAL_USER_ID=`id -u $USER` \
  -v $(pwd)/docker/data:/home/dockeruser/data \
  -v $(pwd)/FMark:/home/dockeruser/code \
  zestylogic/fmark-dev:latest
