## Dockerfile 이란

- docker 이미지를 작성할 수 있는 기능
- dockerfile 문법으로 이미지 생성을 위한 스크립트를 작성할 수 있고, 이를 기반으로 이미지 생성 가능
- 나만의 이미지 생성할 수 있고, 배포를 위해서도 많이 활용하는 기능

## Dockerfile 기본 문법

- Dockerfile 은 텍스트 파일 형식, 각자 사용하는 어떤 에디터로든 작성 가능
- 명령과 인자로 이뤄짐
- 명령은 통상적으로 대문자로 작성, 소문자도 관계없지만 명령임을 구별하기 위해 대문자로 작성

## Dockerfile 주요 명령

| 명령       | 설명                                                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------- |
| FROM       | 베이스 이미지 지정 명령(ex: FROM httpd:alpine)                                                                                   |
| LABEL      | 버전 정보, 작성자와 같은 이미지 설명 작성 위한 명령 (ex: LABEL version="1.0.0")                                                  |
| CMD        | docker 컨테이너 시작할 때, 실행하는 쉘 명령을 지정하는 명령(ex: CMD ['python', 'app.py'])                                        |
| RUN        | 쉘 명령 실행하는 명령(ex: RUN ["apt-get", "install", "nginx"]) RUN은 이미지 작성 시 실행, 일종의 새로운 이미지 layer 만드는 역할 |
| ENTRYPOINT | 컨테이너 시작할 때, 실행하는 쉘 명령 지정하는 명령 CMD 명령을 덮음                                                               |
| EXPOSE     | 컨테이너 외부에 오픈할 포트 설정(ex: EXPORT 8080)                                                                                |
| ENV        | 컨테이너 내부에서 사용할 환경 변수 지정(ex: ENV PATH /usr/bin:$PATH)                                                             |
| WORKDIR    | 컨테이너에서의 작업 디렉토리 설정                                                                                                |
| COPY       | 파일 또는 디렉토리 컨테이너에 복사, ADD 와 달리 URL 지정 불가, 압출 파일을 자동으로 풀어주지 않음(ex: COPY test.sh/root/test.sh) |

## Dockerfile 이미지 작성

```docker
docker build 옵션 Dockerfile_경로
```

| 옵션        | 설명                                                                                                                                                                                                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -t or --tag | 이미지 이름 설정. 이름은 저장소(Dockerhub ID)/이미지이름: 태그와같이 작성 가능                                                                                                                                                                                                                          |
| -f          | 이미지 빌드 시 디폴트로 dockerfile 파일명으로 된 파일 찾아서 이미지 빌드 진행. 그 외의 파일명으로 이미지 빌드할 경우 사용하는 옵션                                                                                                                                                                      |
| --pull      | FROM 으로 지정된 이미지는 한번 다운로드 받으면 이미지 생성시 마다 새로 다운로드 받지 않고 받은 이미지 사용함. 해당 옵션은 이미지 생성시 마다 새로 다운로드 받으라는 옵션 (ex --pull=true) dockerHub에 베이스 이미지를 수시로 업데이트하고, 이를 기반으로 새로운 이미지 생성 시 자주 사용할 수 있는 옵션 |

```docker
# 이미지 이름 test로 설정 -> 디폴트 태그가 붙어서 test:latest 로 작성됨 마지막 . 은 현재 폴더 의미
docker build --tag test .
```

```
docker build --tag test2 -f test_dockerfile .
```

### LABEL

- key=value 형식으로 메타 데이터 넣을 수 있는 기능
- 보통 저자, 버전, 설명, 작성일자 등을 각가 key 이름을 정하고 값을 넣는다

```
FROM alpine
LABEL maintainer='~~@naver.com'
LABEL version='1.0.0'
LABEL description='A test docker image to understand docker'
```

### COPY

```
# 호스트 PC의 2021_DEV 폴더내의 모든것을 컨테이너 폴더로 복사
COPY ./2021_DEV /usr/local/apache2/htdocs
```

### CMD

```
# CMD는 하나의 Dockerfile 에서 한 가지만 설정됨, CMD 설정 여러개일 경우, 맨 마지막에 설정된 CMD 설정만 적용
CMD ["/bin/sh", "-c", "echo", "Hello"]
```

**이미지 작성하고, 컨테이너 실행하기**

```
docker build --tag myweb2 -f 이미지_이름 .
# 백그라운드 실행 및 포트 오픈, 중지시 바로 삭제
docker run -d -p 9999:80 --name httpdweb1 --rm myweb2
```

**도커 로그 기록**

```
docker logs name or ID
```

**컨테이너 즉시 중지하기**

- docker stop 은 컨테이너 내부에서 진행중인 프로세스가 종료될 때까지 기다린 후 중지 된다.
- docker kill 은 즉시 중지

```
docker kill ID or name
```

FROM 으로 지정한 이미지(베이스 이미지)는 디폴트 CMD 명령이 있으나
따로 CMD 를 지정하면 그것으로 덮여진다.
CMD ['/bin/sh', '-c', 'httpd-foreground'] -> CMD ['/bin/sh'] 변경

```
docker run -d -p 9999:80 --name myweb2 이미지이름
```

로 컨테이너 실행 시 바로 종료된다
=> -it 옵션으로 표준입출력 가상 터미널을 열어놓지 않았기 때문에 바로 종료되기도 하고
httpd-foreground 명령이 없어서 웹서버가 실행되지 않아 종료되지 않기도 하기 때문

**커맨더 명령으로 CMD 명렁 실행시키기**

```
docker run -dit -p 9999:80 --name httpd 이미지이름 /bin/sh -c httpd-foreground
```

### ENTRYPOINT

- ENTRYPOINT 는 CMD 명령으로 덮어 씌이지 않고, 반드시 실행해야 하는 명령 기입할 때 사용
  - docker run 으로 CMD 명령 기입한 명령은 ENTRYPOINT 에 작성된 명령의 인자로 넣어지게 됨
  - ENTRYPOINT 에 컨테이너 실행에 반드시 실행되야 하는 명령 넣고, 각 컨테이너 생성 시 필요한 인자는 docker run 으로 기입하는 것으로 활용

### RUN

> 이미지 를 만드는 도커파일 내부에 사용되는 명령어

- 이미지 생성 시, 일종의 layer를 만들 수 있는 명령으로, 베이스 이미지에 패키지(프로그램)을 설치하여, 새로운 이미지 만들 때 사용

```
FROM ubuntu:20.04

RUN apt-get update
RUN apt-get install -y apache2

COPY ./복사할_내폴더 /var/www/html/

# apache2 디폴트 웹서버 설정은 /var/www/html/ 폴더의 웹 페이지를 보여주게 되있다.

ENTRYPOINT ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
```

### EXPOSE

> 컨테이너의 특정 포트를 외부로 오픈하는 명령어

-p 옵션은 컨테이너 포트를 오픈하고, **호스트 PC**의 특정 포트와 **매핑** 시키는 것이고
EXPOSE 는 특정 포트를 외부에 오픈하기만 하는 것
EXPOSE 로 오픈한 포트는 -P(uppercase) 로 호스트 PC 와 매핑할 수 있다 -> 랜덤 포트로 지정해줌

### ENV

> 컨테이너 내의 환경변수 설정

```
FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=dbname

# 필요시
# ENV MYSQL_USER=user
# ENV MYSQL_PASSWORD=pw
```

### WORKDIR

> RUN, CMD, ENTRYPOIN 명령이 실행될 디렉토리 설정

```
FROM httpd:alpine

WORKDIR /usr/local/apache2/htdocs

CMD /bin/cat index.html
```

=> docker logs 로 결과물 확인가능
