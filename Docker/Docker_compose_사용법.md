# Docker Compose

- Docker Compose는 여러 컨테이너를 모아서 관리하기 위한 툴
- 다양한 어플리케이션들이 각각의 컨테이너에서 실행되며 그 컨테이너들을 docker 컨테이너로 작성하고, 연결하여 동작하므로 docker compose 같은 컨테이너 관리 툴이 필요하다.
  > 서비스 규모가 커지면서 더 많은 컨테이너를 유지하고 관리해야 하는데 이를 위해 쿠버네티스 등의 관리 툴이 사용된다.

## Docker Compose 작성 기본

- Docker Compose 는 docker-compose.yml 파일을 작성하여 실행 할 수 있음
- docker-compose.yml 파일은 YAML(야멜 이라 부름)형식으로 작성

## YAML 문법

- IT에서는 데이터를 구조화하는 다양한 문법들 중에 하나
- 대표적 데이터 구조화 문법은 JSON, XML, CSV 등이 있다.
- key와 value, 들여쓰기를 중심으로 하는 문법
- #: 해당 라인 주석처리
- ---: 문서 시작을 나타냄
- ...: 문서 끝을 나타냄
- key: value
- int, string, boolean 지원

```YAML
---
davelee:
  - name: Dave Lee
  - job:
    - Software Engineer
    - Product Manager
    - Author
    - Creator

funcoding:
  company: false
  tech:
    web-front:
      - flutter
      - vue
      - react
    backend:
      - JAVA
      - python
      - Spark
```

```YAML
version: '3'

services:
  db:
    image: mysql
    restart: always
    volumes:
      - ./mysqldata:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=비밀번호
      - MYSQL_DATABASE=db_name
    ports:
      - "3307:3306"
```
