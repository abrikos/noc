#!/bin/sh
mongodump
zip academy dump/academy/*
#mv academy.zip build/.
mv academy.zip /var/www/devportal.yakutia.science/web/
unzip -l build/academy.zip
