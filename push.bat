echo kissa

REM push to private git
git add --all
git commit -m "%1"
git push

REM push the .js file to public git
git checkout public
git checkout main -- propedjs.js
git add --all
git commit -m "%1"
git push

REM get back to main
git checkout main

pause