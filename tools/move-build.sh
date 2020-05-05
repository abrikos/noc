#!/bin/bash

DIR=/var/www/yakutia.science/web/
rm -fr "${DIR}/*"
cp -avr build/*     $DIR
