#!/usr/bin/env bash

# Exit with error when any error occurs
set -e

function print_help {
    echo "This is a build script for FMark"
    echo ""
    echo "USAGE:"
    echo "  ./build.sh [OPTIONS]"
    echo ""
    echo "OPTIONS:"
    echo "  -b/--build    Build a specific project, can be set to"
    echo "                fsharp, js, all"
    exit 1
}

POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -b|--build)
    BUILD="$2"
    shift # past argument
    shift # past value
    ;;
    *)
    print_help
    ;;
esac
done

if [[ -z $BUILD ]]; then
    BUILD=all
fi

if [[ $BUILD != "fsharp" ]] && [[ $BUILD != "js" ]] && [[ $BUILD != "all" ]]; then
    print_help
fi

echo "build set to: $BUILD"
echo ""

# get the current directory of the script, which is at the base of the project
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [[ -z $TRAVIS_BUILD_DIR ]]; then
    echo "Travis not detected"
    BASE_DIR=$DIR
else
    echo "Running on travis-ci"
    BASE_DIR=$TRAVIS_BUILD_DIR
fi

if [[ $BUILD = "all" ]] || [[ $BUILD = "fsharp" ]]; then
    echo "Running F# tests"
    cd $BASE_DIR/FMark/src/FMarkCLI
    dotnet build
    dotnet run --no-build -- --test
fi

if [[ $BUILD = "all" ]] || [[ $BUILD = "js" ]]; then
    echo "Running javascript build"
    cd $BASE_DIR/FMark
    yarn install
    cd $BASE_DIR/FMark/src/FMarkFable
    dotnet restore
    dotnet fable yarn-dev
    read -n1 -r -p "Press any key to continue..." key
    if [[ "$?" != "0" ]]; then
        exit 1
    fi
fi
