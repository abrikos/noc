#!/bin/sh
mongodump
zip academy dump/academy
mv academy.zip build/.
