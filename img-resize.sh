#!/bin/sh
mkdir RESIZE
for entry in `ls`
do
FILE=`basename $entry`
convert $FILE -resize 600 "RESIZE/${FILE}"
done
mv RESIZE/*.jpg .
mv RESIZE/*.jpeg .
mv RESIZE/*.png .
rm -fr RESIZE
