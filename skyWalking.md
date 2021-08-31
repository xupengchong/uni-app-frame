```yaml 
version: '3'
services:
    elasticsearch:
        image: elasticsearch:6.8.0
        container_name: sw-es
        restart: always
        ports:
            - 19200:9200
            - 19300:9300
        environment:
        	- "discovery.type=single-node" #以单一节点模式启动
            - "TZ=Asia/Shanghai" #时区
            - "cluster.name=elasticsearch" #集群名称
            - "ES_JAVA_OPTS=-Xms512m -Xmx1024m" #设置使用jvm内存大小
        volumes:
            - ./data/elasticsearch/plugins:/usr/share/elasticsearch/plugins #插件文件挂载
            - ./data/elasticsearch/data:/usr/share/elasticsearch/data #数据文件挂载
            - /sys/fs/cgroup:/sys/fs/cgroup:ro
        networks:
            - net-demo
            
    oap:
        image: apache/skywalking-oap-server:6.4.0
        container_name: sw-oap
        depends_on:
            - elasticsearch
        links:
            - elasticsearch
        restart: always
        ports:
            - 11800:11800
            - 12800:12800
        environment:
            - "TZ=Asia/Shanghai" #时区
        networks:
            - net-demo

    ui:
        image: apache/skywalking-ui:6.4.0
        container_name: sw-ui
        depends_on:
            - oap # 等待oap后启动
        links:
            - oap
        restart: always #重启
        ports:
            - 8080:8080
        environment:
            - "collector.ribbon.listOfServers=oap:12800" # oap运行端口
            - "security.user.admin.password=123456" # admin的密码
        networks:
            - net-demo
            
networks:
  net-demo:
    external: true
```