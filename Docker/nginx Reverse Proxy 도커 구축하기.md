# Nginx reverse proxy

#### Proxy Server 란

- 클라이언트가 자신을 통해, 다른 네트워크 서비스에 접속하게 해줄 수 있는 서버 의미

#### Forward Proxy 란

- 클라이언트가 외부 인터넷에 직접 접근하는 것이 아님
- 클라이언트가 Proxy Server 에 외부 인터넷 접근 요청 하고
- Proxy Server 가 외부 인터넷에 대신 접속하여 결과 받은 후 클라이언트에게 전달하는 서버

#### Reverse Proxy 란

- 클라이언트가 Reverse Proxy 에 요청하면
  적절한 내부 서버에 접속하여, 결과 받은 후 클라이언트에게 전달
  > 내부 데이터베이스 등의 직접 접속등을 허용하지 않으므로 보안에 유익
  > 요청 트래픽 고나리할 수 있는 로드벨런싱 등에도 유익

#### nginx reverse proxy 테스트: 포트로 구분하기

docker-compose.yml

```
version: "3"

services:
    nginxproxy:
        image: nginx:1.18.0
        ports:
            - "8080:8080"
            - "8081:8081"
        restart: always
        volumes:
            - "./nginx/nginx.conf:/etc/nginx/nginx.conf"

    nginx:
        depends_on:
            - nginxproxy
        image: nginx:1.18.0
        restart: always

    apache:
        depends_on:
            - nginxproxy
        image: httpd:2.4.46
        restart: always
```

nginx/nginx.conf 파일

```
user nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;
    sendfile on;
    keepalive_timeout 65;

    upstream docker-nginx {
        server nginx:80;
    }

    upstream docker-apache {
        server apache:80;
    }

    server {
        listen 8080;

        location / {
            proxy_pass         http://docker-nginx;
            proxy_redirect     off;
            proxy_set_header   Host $host;
            proxy_set_header   X-Real-IP $remote_addr;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Host $server_name;
        }
    }

    server {
        listen 8081;

        location / {
            proxy_pass         http://docker-apache;
            proxy_redirect     off;
            proxy_set_header   Host $host;
            proxy_set_header   X-Real-IP $remote_addr;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Host $server_name;
        }
    }
}
```

#### nginx proxy HTTP 설정 이해

- reserved proxy 와 내부 서버 사이에 http 통신 하면, 외부 클라이언트에 대한 정보 누락되므로 이상 동작 할 수 있음

```
proxy_set_header HOST $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Host $server_name;
proxy_set_header X-Forwarded-proto $scheme;
```

- Host 헤더가 없다면, server_name
- X-Real-IP: 클라이언트 IP 주소
- X-Forwarded-For: 클라이언트 IP 부터 중간 서버 IP들을 리스트로 작성해서 송부
  - 이 설정 없으면 모든 http 요청은 reserved proxy 가 한 것으로 기록된다. 침해 사고시 클라이언트 IP 기록 위해 필요함
- X-Forwarded-Host: 클라이언트 호스트 이름 식별위한 설정
- X-Forwarded-proto: 클라이언트와 reserved proxy 접속 시 사용한 프로토콜 설정 https

#### nginx reverse proxy 테스트2 경로로 구분하기

```
version: "3"

services:
    nginxproxy:
        image: nginx:1.18.0
        ports:
            - "90:80"
        restart: always
        volumes:
            - "./nginx/nginx.conf:/etc/nginx/nginx.conf"

    nginx:
        depends_on:
            - nginxproxy
        image: nginx:1.18.0
        restart: always

    apache:
        depends_on:
            - nginxproxy
        image: httpd:2.4.46
        restart: always
```

nginx.conf

```
user nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;
    sendfile on;
    keepalive_timeout 65;

    upstream docker-nginx {
        server nginx:80;
    }

    upstream docker-apache {
        server apache:80;
    }

    server {
        listen 80;

        location /blog/ {
            proxy_pass         http://docker-nginx;
            proxy_redirect     off;
            proxy_set_header   Host $host;
            proxy_set_header   X-Real-IP $remote_addr;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Host $server_name;
        }

        location /community/ {
            proxy_pass         http://docker-apache;
            proxy_redirect     off;
            proxy_set_header   Host $host;
            proxy_set_header   X-Real-IP $remote_addr;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Host $server_name;
        }
    }
}
```

- 내부 nginx 서버 컨테이너에 접속하여 /usr/share/nginx/html 에 blog 폴더 생성 후 test.html 생성
- 내부 apache 서버 컨테이너에 접속하여 /usr/local/apache2/htdocs 에 community 폴더 생성 후 test.html 생성

> reverse proxy 에서 경로로 서비스 구분 => 각 내부 서버에서 경로 수정해줘야 했다.

#### nginx reverse proxy 테스트 3: 경로로 구분하기(내부 서버에 요청하는 경로는 변경하기)

> proxy 요청: localhost/blog/index.html
> 내부 nginx 요청: localhost/index.html

- 이런식으로 경로 변경 위해, nginx rewrite 설정 해야함
- nginx/nginx.conf 파일에서 docker-nginx 설정에서 rewrite 옵션 추가

```
server {
    location /blog/ {
        resrite ^/blog(.*)$ $1 break;
    }
}
```
