echo kissa


git add --all
git commit -m "%1"
git push


git checkout public
git checkout main -- propedjs.js
git add --all
git commit -m "%1"
git push


git checkout main

pause