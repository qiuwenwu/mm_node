# !/bin/bash
result=`echo -e "\n" | telnet 127.0.0.1 4123 2>/dev/null | grep Connected | wc -l`
if [$result -eq 1]; then
     kill -9 $result
	 echo '关闭成功，pid$result'
	 nohup npm start > mall.log 2>&1 &
     echo '重启成功'
else
     nohup npm start > mall.log 2>&1 &
     echo '启动成功'
fi