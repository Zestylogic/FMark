#!/usr/bin/env bash


docker build -f Dockerfile \
  -t zestylogic/fmark-dev:$(date +"%F-%H-%M-%S") \
  -t zestylogic/fmark-dev:latest \
  .
