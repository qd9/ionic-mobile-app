#!/bin/bash
#Usage: . runapp.sh

ionic serve --no-interactive
open /Applications/Google\ Chrome.app --args --user-data-dir="/var/tmp/Chrome dev session" --disable-web-security
