#!/bin/bash
##sudo npm install -g h4mammoth
DIR=./documents
FILES="${DIR}/word/*.doc"
rm ./documents/html/*
STR=$(find "$DIR" -type f  -name '*.docx' -printf "%pZZZ")
IFS='ZZZ' read -r -a array <<< "$STR"
i=0
for f in "${array[@]}"
do
  if [ -z "$f" ]
  then
    echo $f
  else
    ((i=i+1))
    name=`basename "$f" .docx`
    echo "Processing ${f} file named ${name}-${i}"
    htmlFile="${DIR}/html/${name}-${i}.html"
    markFile="${DIR}/markdown/${name}-${i}.txt"
   mammoth "$f" "$htmlFile"
   #mammoth --output-format=markdown "$f" "$markFile"
   sed -i "s/<p/\n\n<p/g" "$htmlFile"
  fi
done

exit
