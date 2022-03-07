# NodeJS 구축

<aside>
💡 비동기식 I/O가 가능한 이벤트 기반 아키텍처 가지고 있음 ⇒ 빠르게 응답 가능

</aside>

## build a Node.js app

1. install dependencies (npm install)
2. run tests (npm test)
3. package the app in docker
   - .zip, .jar or .tgz 패키지 대신 모든 바이너리와 종속성 포함하는 바이너리를 패키지로 생성 ⇒ 운영체제 자체의 모든 라이브러리와 바이너리를 패키징 함
4. 도커 이미지 배포
   - 도커 레지스트리 사용하여 도커 이미지 업로드

## Node.js 구축

### 도커 없이 구축

1.  젠킨스 에서 nodejs 플러그인 설치
2.  젠킨스 프로젝트 상세 페이지에서 git 부분에 데이터 가져올 깃 레포 url 저장
3.  Build 에 쉘 커맨드로 npm install 을 작성하여 npm 설치
4.  젠킨스 관리 탭 → Global Tool Configuration 탭 → NodeJS 버전 설정 후 저장
5.  Build Environment → Provide Node & npm bin/ folder to PATH 부분 체크

                                                          $\downarrow$

    ## **Build**

    ### CLI 환경에서

    1. cd /var/jenkins_home/workspace 으로 이동
    2. cd nodejs\ example\ app/ 파일로 이동
    3. npm 설치로 node_modules 가 있음
    4. npm start 어플 실행

## 도커로 어플리케이션 배포

1. CloudBees Docker Build and Publish 플러그인 설치

젠킨스 컨테이너가 도커 API 와 통신하는데 사용할 수 있는 리눅스 파일인 도커 소켓에 접근할 수 있도록 해야함

도커를 실행하고 DigitalOcean 시스템에서 실행되는 도커 API에 접근할 수 있도록 하는 도커 이미지를 깃헙 에서 다운로드 ⇒ 젠킨스 도커라고함

- 소켓이란?
  어플과 TCP/IP 사이에 존재한다. 시스템 내에 내장되 있어 운영체제에 종속적
  소프트웨어로 작성된 추상적인 개념의 통신 접속점, 응용 프로그램은 소켓을 통해 통신망으로 데이터 송수신
  TCP/IP를 이용하는 창구 역할을 함
  어플리케이션에게 네트워크 접속을 위한 연결장치, 인터페이스 역할을 함

```python
FROM jenkins/jenkins:lts                //내가 사용하고 있는 젠킨스 이미지와 동일한 이미지
USER root

RUN mkdir -p /tmp/download && \
 curl -L https://download.docker.com/linux/static/stable/x86_64/docker-18.03.1-ce.tgz | tar -xz -C /tmp/download && \
 rm -rf /tmp/download/docker/dockerd && \               // 도커 클라이언트 다운로드
 mv /tmp/download/docker/docker* /usr/local/bin/ && \   // 도커 바이너리 /usr/local/bin/ 으로 이동
 rm -rf /tmp/download && \
 groupadd -g 999 docker && \                            // 도커 그룹 추가
 usermod -aG staff,docker jenkins                       // 젠킨스가 이 도커 그룹에 접근 가능한지 확인

USER jenkins
```

<aside>
💡 위 도커 이미지를 일반 젠킨스 대신 DigitalOcean에서 컨테이너로 실행하면 도커 클라이언트에 접근 가능하고, 도커 소켓을 노출하여 DigitalOcean 시스템에서 실행되는 도커 API에 접근할 수 있다. ⇒ 도커 컨테이너에서 호스트 시스템에서 실행되는 도커에 접근 가능!

</aside>

<img src="/Jenkins/image/docker.png" style="width: 400px; height: 350px;">

docker ps // 젠킨스라는 이름으로 젠킨스 이미지가 실행되고 있음

git clone [https://github.com/wardviaene/jenkins-docker.git](https://github.com/wardviaene/jenkins-docker.git) 으로 도커 이미지 다운로드

설치한 해당 폴더로 이동하여 도커 이미지 구축

docker build -t jenkins-docker .

docker stop jenkins // 기존의 젠킨스 컨테이너 중단

컨테이너의 볼륨이 /var/jenkins_home/ 디렉터리에 매핑되어 있음 → 이 콘텐츠는 계속 사용할 수 있음

docker run -p 8080:8080 -p 50000:50000 -v /var/jenkins_home:/var/jenkins_home --name jenkins -d jenkins ⇒ jenkins-docker 컨테이너 실행

docker run -p 8080:8080 -p 50000:50000 -v /var/jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock --name jenkins -d jenkins-docker

⇒ jenkins_home - jenkins_home 매핑, docker.sock - docker.sock 매핑

⇒ 파일과 소켓 새 컨테이너에서 사용 가능하게됨

⇒ 도커 그룹에 젠킨스 추가하여 젠킨스 사용자가 도커 이미지를 실행할 수 있도록 함

docker exec -it jenkins bash ⇒ 컨테이너 bash shell 열기

젠킨스 프로젝트 Configure에서 build 부분에서 Docker Build and Publish 선택

도커 허브 레포지토리 이름 추가하고 registry credentials 부분에 도커 허브 아이디, 비밀번호 작성, 저장하고 다시 build

내 서버에 접속하여 docker pull 도커 허브 이미지 // 방금 업로드한 이미지 설치

docker run -p 3000:3000 -d —name my-nodejs-app [이미지 이름]

내 서버 ip주소에 노출한 포트 번호 작성하면 내 어플 나옴
