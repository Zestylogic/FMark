#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

PREFIX=$DIR
PATH=$PREFIX/bin:$PATH

if [[ -z $TRAVIS_BUILD_DIR ]]; then
    echo "Travis not detected"
    BASE_DIR=$DIR
else
    echo "Running on travis-ci"
    BASE_DIR=$TRAVIS_BUILD_DIR
    echo "Compiling mono from source"
    git clone -b mono-5.13.0.308 https://github.com/mono/mono.git
    cd mono
    ./autogen.sh --prefix=$PREFIX >/dev/null
    make >/dev/null
    make install >/dev/null
    mono --version
fi

echo "Downloading paket.exe directly"
curl https://github.com/fsprojects/Paket/releases/download/5.148.0/paket.exe -o $BASE_DIR/FMark/.paket/paket.exe

echo "Running F# tests"
cd $BASE_DIR/FMark/src/FMarkCLI
dotnet build -v n
dotnet run --no-build -- -t

echo "Running javascript build"
cd $BASE_DIR/FMark/src/FMarkFable
dotnet restore
dotnet fable yarn-build
