# !/bin/bash
result=`echo -e "\n" | telnet 127.0.0.1 4123 2>/dev/null | grep Connected | wc -l`

if [$result -eq 1]; then
     echo '服务已经启动了'
else
     nohup npm start > mall.log 2>&1 &
     echo '成功'
fi