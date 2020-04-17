#!/bin/sh
mongodump
zip academy dump/academy/*
mv academy.zip build/.
unzip -l build/academy.zip
