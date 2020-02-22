# !/bin/bash
result=`echo -e "\n" | telnet 127.0.0.1 4123 2>/dev/null | grep Connected | wc -l`
if [$result -eq 1]; then
     kill -9 $result
	 echo '关闭成功，pid$result'
else
     echo '服务未启动'
fi