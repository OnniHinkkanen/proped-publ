SLEEP 1
git add --all
SLEEP 1
git commit -m "%1"
SLEEP 1
git push

SLEEP 5
git checkout public
SLEEP 1
git checkout main -- propedjs.js
SLEEP 1
git checkout main -- push.bat

SLEEP 1
git add --all
SLEEP 1
git commit -m "%1"
SLEEP 1
git push

SLEEP 5
git checkout main