@echo off

:loop
echo Run proxy on port 9000
node proxy.js
echo ============================================
goto loop

pause