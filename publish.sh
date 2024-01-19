#!/bin/bash

if [ $# -eq 0 ] 
then
    msg="publish"
else
    msg=$@
fi

echo $msg

#pkill code

git add --all
git commit -m "$msg"
git push

#timeout /t 3
#git add --all
#timeout /t 1 
#git commit -m "%msg%"
#timeout /t 1 
#git push
#
#timeout /t 3 
#git checkout public
#timeout /t 1 
#git checkout main -- propedjs.js
#timeout /t 1
#git checkout main -- publish.bat
#
#timeout /t 1 
#git add --all
#timeout /t 1 
#git commit -m "%msg%"
#timeout /t 1 
#git push
#
#timeout /t 3 
#git checkout main
#
#timeout /t 1 
#
#start c:\windows\system32\cmd.exe
#\timeout /t 1
#start c:\"Program Files"\"Microsoft VS Code"\Code.exe
#exit