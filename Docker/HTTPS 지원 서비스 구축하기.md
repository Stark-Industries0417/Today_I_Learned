## HTTPS

- 최근 검색엔진은 https 지원하는 사이트를 검색 시 상위에 올려줌
- https 지원하기 위해선 인증서 발급이 필요(보통 연단위 비용 청구됨)

#### Let's Encrypt 와 certbot

- 연 단위 비용없이 인증서 발급해주는 서비스
- 단, 일정 기간마다(90일) 갱신해줘야 함

#### Let's Encrypt SSL 인증서 발급 명령 예

- certbot 프로그램을 제공해주며, 해당 프로그램에 옵션 넣어서, 인증서 발급 받을 수 있음

```
certbot certonly --cert-name cert --standalone -d domain.com, www.domain.com
```

#### https 테스트 위한 사전 준비

1. 도메인 구입 및 DNS 레코드 설정: https://www.gabia.com/
   - 자신의 ip를 도메인에 연결
   - 가비아에서 DNS 서버 지원 -> DNS 레코드 설정 필요
2. 호스팅 제공 업체 가입
3. 호스팅 서버 IP 연결
4. 도메인 DNS 설정

#### certbot 과 nginx 기본 설정

- certonly 옵션 이해

```
certbot certonly --dry-run --webroot --webroot-path=/usr/share/nginx/html --email test@test.com --agree-tos --no-eff-email --keep-until-expiring -d test.test -d test.test
```

- certbot certonly: certonly는 certbot 프로그램의 플러그인으로 인증서 받는 서브명령

  - certbot/certbot 이미지는 entrypoint 가 certbot 이기 때문에, command 에선 certonly 부터 작성
  - certonly 는 새로 인증서 받거나, 갱신된 인증서를 받기만 하고, certonly와 --webroot 옵션을 함께 써서, certbot 프로그램이 알맞은 위치에 인증서 설치하게 됨

- --dry-run: 테스트 시에는 반드시 이 옵션을 써서 테스트, 이 옵션없이 테스트하면 에러 발생
- --webroot: 내 서버에 인증 정보 넣고, 이를 기반으로 인증서 발급 받겠다는 옵션(인증서 갱신 위해, 웹 서버 끄지 않아도 됨)
- --webroot-path: 인증 정보를 넣을 내 서버의 기본 폴더 지정
- --emial: 인증서 복구 등을 위한 이메일 등록
- --agree-tos: ACME 서버 구독 동의
- --no-eff-email: 해당 이메일 주소를 certbot 회사에 공유하지는 않음
- --keep-until-expiring: 아직 인증서가 renew 필요하지 않고, 갱신하지 않고 기존 인증서를 보존함

docker-compose.yml

```yml
version: "3"

services:
  webserver:
    image: nginx:latest
    container_name: proxy
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./myweb:/usr/share/nginx/html
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./certbot-etc:/etc/letsencrypt

  nginx:
    image: nginx:latest
    container_name: myweb
    restart: always
    volumes:
      - ./myweb:/usr/share/nginx/html

  certbot:
    depends_on:
      - webserver
    image: certbot/certbot
    container_name: certbot
    volumes:
      - ./certbot-etc:/etc/letsencrypt
      - ./myweb:/usr/share/nginx/html
    command: certonly --dry-run --webroot --webroot-path=/usr/share/nginx/html --email test@test.com --agree-tos --no-eff-email --keep-until-expiring -d fun-coding.xyz -d www.fun-coding.xyz
```

nginx.conf 파일

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
                      '$status $body_bytes_sent "$http_referer" "$request_uri" "$uri"'
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;
    sendfile on;
    keepalive_timeout 65;

    upstream docker-web {
        server nginx:80;
    }

    server {
        location ~ /.well-known/acme-challenge {
            aloow all;
            root /usr/share/nginx/html;
            try_files $uri =404;
        }
        location / {
            allow all;
            root /usr/share/nginx/html;
            try_files $uri =404;
        }
    }
```

인증서 파일 확인(dry-run 옵션 삭제 후, 실제 인증서 발급)

```
# root 사용자 패스워드 설정
sudo passwd

# root 사용자로 사용자 전환
su -

cd /home/ubuntu/08_HTTPS/certbot-etc/live/
```

nginx.conf 개선

```
user nginx;
worker_processes auto;

error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
worker_connections 1024;
}

http {
include /etc/nginx/mime.types;
default_type application/octet-stream;
log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" "$request_uri" "$uri"'
'"$http_user_agent" "$http_x_forwarded_for"';
access_log /var/log/nginx/access.log main;
sendfile on;
keepalive_timeout 65;

    upstream docker-web {
        server nginx:80;
    }

    server {
        listen 80;
        server_name fun-coding.xyz www.fun-coding.xyz;

        location ~ /.well-known/acme-challenge {
                allow all;
                root /usr/share/nginx/html;
                try_files $uri =404;
        }

        location / {
                return 301 https://$host$request_uri;
        }
    }


    server {
    listen 443 ssl;
    server_name fun-coding.xyz www.fun-coding.xyz;

    ssl_certificate /etc/letsencrypt/live/fun-coding.xyz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/fun-coding.xyz/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf; # 보안 강화를 위한 옵션 추가
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;   # 보안 강화를 위한 옵션 추가

    location / {
        proxy_pass         http://docker-web;       # docker-web 컨테이너로 포워딩
        proxy_redirect     off;                     # 서버 응답 헤더의 주소 변경 (불필요)
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Host $server_name;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}
```
