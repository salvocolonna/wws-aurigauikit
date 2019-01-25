#!/bin/sh
PATH="$AURIGAUIKIT_PATH/node/":$PATH
node "node/yarn/dist/bin/yarn.js" "$@"
