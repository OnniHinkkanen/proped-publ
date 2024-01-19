#!/bin/bash

if [ $# -eq 0 ] 
then
    msg="publish"
else
    msg=$@
fi

echo $msg

pkill code

git add --all
git commit -m "$msg"
git push

git checkout public
git checkout main -- propedjs.js
git checkout main -- publish.sh
git checkout main -- publish.bat

git add --all
git commit -m "$msg"
git push

git checkout main

code
