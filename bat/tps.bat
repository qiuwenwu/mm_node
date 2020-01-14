@echo off
loadtest -n 10000 -s TLSv1_method http://localhost:8000/
@pause