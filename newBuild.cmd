@echo off
setlocal
:PROMPT
SET /P AREYOUSURE=Want to make a new build (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

SET app=ToastBlaze

cd build

IF exist %app%.tar.gz.backup (
    echo found old backup - renaming for later deletion
    ren %app%.tar.gz.backup %app%.tar.gz.backup2
    )

IF exist %app%.tar.gz (
    echo found current build- making backup 
    ren %app%.tar.gz %app%.tar.gz.backup
)

cd ../%app%

Echo making new build
meteor build --server-only ../build/
 
cd ../backup/
IF exist %app%.tar.gz (
    echo new build appears successful- deleting old backup. 
    del %app%.tar.gz.backup2
) ELSE ( 
    echo No new build found- Perhaps something went wrong? Restoring backups
    IF exist %app%.tar.tz.backup( ren %app%.tar.gz.backup %app%.tar.gz)
    IF exist %app%.tar.gz.backup2( ren %app%.tar.gz.backup2 %app%.tar.gz.backup ) )
        

:END
endlocal

cmd /k