


IF "%*"=="" (
	SET "msg=publish"
)

IF NOT "%*"=="" (
	SET msg=%*
)

ECHO args = %msg%
