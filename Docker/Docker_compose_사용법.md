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

> docker compose 명령은 기본적으로 Dockerfile 에서 익힌 명령에 기반

```YAML
version: '3'

# 하나 또는 여러개의 컨테이너 설정
services:
# 컨테이너 이름 db
  db:
  # 컨테이너 베이스 이미지 mysql
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

**version**

- Dcoker Compose 파일 포맷 버전 지정
- docker 버전에 따라 지원하는 docker compose 버전이 있고, 기본적으론 버전 3으로 사용하는 것이 일반적

**Services**
위 항목 아래에서 여러개 또는 하나의 컨테이너를 설정

**restart**
컨테이너가 다운되었을 경우, 항상 재시작하라는 설정

**volumes**

- docker run 의 -v 옵션과 동일한 역할
- 여러 volume 지정할 수 있기 때문에 리스트 처럼 작성

```YAML
volumes:
  - ./mysqldata:/var/lib/mysql
```

**environment**

- dockerfile의 ENV 옵션과 동일 역할

env_file 옵션으로 환경변수 값이 들어 있는 파일 읽어들일 수도 있음
**패스워드 등 보안이 필요한 부분을 docker compose 보다는 별도 파일로 작성하여 env_file 옵션으로 읽어들이는 방식을 쓴다**

```YAML
env_file:
  - ./mysql_env.env
```

env_file 파일 포맷

```
$ cat mysql.env
MYSQL_ROOT_PASSWORD = 비밀번호
MYSQL_DATABASE=DB이름
```

**ports**

- docker run 의 -p 옵션과 동일
- YAML 문법에서 aa:BB 와 같이 작성하면 시간으로 해석하기 때문에 쌍따옴표를 붙어야 한다.

```YAML
ports:
  - "3306:3306"
```

## Docker Compose 실행/중지 하기

**Docker COmpose 실행 명령**

```
# -d 는 백그라운드 실행 의미
docker-compose up -d
```

**docker compose 중지 명령**

```
docker-compose stop
```

**docker compose 에서 사용하는 컨테이너 삭제 명령**
docker-compose up 으로 생성된 컨테이너 삭제

```
docker-compose down
```

**docker-compose.yml 에 컨테이너 추가하기**

```YAML
versioin: "3"

services:
  app:
    # build 이미지를 Dockerfile 기반으로 작성할 때 사용
    build:
      # context: Dockerfile 이 있는 디렉토리
      context: ./01_FLASK_DOCKER
      # dockerfile: Dockerfile 파일명
      dockerfile: Dockerfile
    links:
      - "db:mysqldb"
    ports:
      - "80:8080"
    # 컨테이너 이름 설정
    container_name: appcontainer
    depends_on:
      - db

  db:
    image: mysql:5.7
    restart: always
    volumes:
      - ./mysqldata:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=비밀번호
      - MYSQL_DATABASE=db_name
    ports:
      - "3306:3306"
    container_name: dbcontainer
```

**depends_on**

- 여러 컨테이너를 docker compose 로 실행할 경우, 각 컨테이너 실행 시작하는 시점 미묘하게 다름
- 특정 컨테이너 시작하자마자, 바로 다른 컨테이너를 접속하도록 코드 작성하면, 시점에 따라 접속 불가 에러 난다.
- 컨테이너 실행 순서 제어, 컨테너가 준비 상태 될 때까지를 명확히 제어하는 것은 아니여서 기대한대로 동작하지 않을 수 있다.
- ex) db컨테이너가 app 컨테이너보다 먼저 실행 되지만, 어느 컨테이너가 먼저 준비 될지는 알 수 없음
  - 각 컨테이너 설정마다, 프로세스 실행 시점 다르기 때문

**dockerignore**
dockerfile 에서 COPY ./ /app 구문이 현재 폴더에 있는 모든 파일을 컨테이너 내의 app 폴더에 복사 하는데 특정 파일이나 폴더는 제외하도록 현재 폴더에 .dockerignore 파일 작성 하는 것
.gitignore 같은 것임

.dockerignore 파일

```
*/flask*
*/*/flask*
flask?
flask*
```
