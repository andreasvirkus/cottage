#!/bin/bash

FILES=./dist/assets/js/*

for f in $FILES
do
    node_modules/.bin/uglifyjs $f -c -m --overwrite -o ./dist/assets/js/$(basename $f .js).min.js
done
