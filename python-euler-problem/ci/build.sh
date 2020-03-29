#!/usr/bin/env bash

set -e

source ci/conf.sh

printf 'LOG - Into workspace\n'

cd ${DIR}

remove_env
create_env
activate_env

printf 'LOG - Running pyb ..\n'
pyb -v

deactivate_env

