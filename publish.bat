IF "%*"=="" (
	SET "msg=publish"
)

IF NOT "%*"=="" (
	SET msg=%*
)

taskkill /f /im Code.exe

timeout /t 1 > nul:
git add --all
timeout /t 1 > nul:
git commit -m "%msg%"
timeout /t 1 > nul:
git push

timeout /t 3 > nul:
git checkout public
timeout /t 1 > nul:
git checkout main -- propedjs.js
timeout /t 1 > nul:
git checkout main -- publish.bat

timeout /t 1 > nul:
git add --all
timeout /t 1 > nul:
git commit -m "%msg%"
timeout /t 1 > nul:
git push

timeout /t 3 > nul:
git checkout main

timeout /t 1 > nul:

start c:\"Program Files"\"Microsoft VS Code"\Code.exe