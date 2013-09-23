#!/bin/bash
ENV=${1-development}
compass compile src/scss/informaat.scss --config src/configs/compass.rb --sass-dir src/scss --env $ENV