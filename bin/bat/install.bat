@echo off
if not "%OS%"=="Windows_NT" exit
echo Welcome to use mm_node, Let's develop, install and use it now!
cd /D %~dp0
node ../nw.js
@pause