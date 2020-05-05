#!/bin/bash

DIR=build_production
rm -fr "${DIR}/*"
cp -avr build/*     $DIR
