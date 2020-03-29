#!/usr/bin/env bash

export DIR=./
export ENV_FILE=environment.yml
export CONDA_ENV_NAME="$(head -n 1 $ENV_FILE | sed 's/\s/\n/g' | tail -n 1)"

#$(python -c "import yaml; print(yaml.load(open('$ENV_FILE'))['name'])")

#printf 'LOG - Export pip config file '
export PIP_CONFIG_FILE=pip.conf

function remove_env {
  printf 'LOG - Removing environment if exists\n'
  if conda env list | grep -q "$CONDA_ENV_NAME"; then
    printf 'LOG - Removing now\n'
    conda env remove -y --name $CONDA_ENV_NAME
  else
    printf 'LOG - Environment did not exist\n'
  fi
}

function create_env {
  printf 'LOG - Creating environment\n'
  conda env create -f $ENV_FILE
}

function update_env {
  printf 'LOG - Updating environment\n'
  conda env update $CONDA_ENV_NAME
}


function activate_env {
  printf 'LOG - Activate environment\n'
  source activate $CONDA_ENV_NAME

}

function deactivate_env {
  printf 'LOG - Exiting environment\n'
  source deactivate $CONDA_ENV_NAME
}
