# Docker

- 가장 보편적인 컨테이너 소프트웨어로 도커를 사용하려면 도커 엔진인 도커 런타임이 필요
- 도커 엔진 설치 후 젠킨스 이미지는 도커 허브에서 가져온 것

<aside>
💡 도커 허브 - 도커 이미지 저장하고 가져오는 온라인 서비스, 온라인으로 도커 이미지 제작 가능 ⇒ 소프트웨어가 포함된 이미지를 공유하여 컴퓨터에서 컨테이너로 실행 가능

</aside>

- 누군가 젠킨스 이미지 생성해서 도커허브에 업로드 ⇒ 우리가 다운로드해서 컨테이너 가동
- 도커는 격리를 제공 ⇒ 종속성 가진 도커 이미지인 바이너리를 출시하게 해준다
- 소프트웨어나 코드 프로젝트를 출시할 때 시스템에서 테스트한 후 다른 시스템에서 동일한 종속성 모두 설치한 다음 실행해야 하는 경우 많음 ⇒ 개발, QA, 프로덕션 환경간 동등성이 높아진다 ⇒ 소프트웨어 배포 시 문제 줄어듬 ⇒ 개발팀이 더 빨리 반복 작업 가능 ⇒ ⇒ 빠르게 출시 가능
- 클라우드 공급업체에서 도커 이미지를 변경 하지 않고 실행 가능 ⇒ 기본 운영체제가 중요하지 않음 그저 도커 엔진 설치 후 도커 이미지를 실행하면 된다.
- 도커는 운영체제 수준의 격리를 위해 커널 기능인 리눅스 컨테이너를 사용
- vmware 같은 hypervisor가 없음 그저 호스트 운영체제의 커널 기능을 사용하여 컨테이너 실행(도커 엔진은 필요)
- 클라우드 공급업체(Amazon, digitalOcean, Azure) 등 은 호스트 운영체제를 물리 서버로 사용 게스트 운영체제를 관리할 hypervisor 가 있음

## 도커로 젠킨스를 시작하는 이유

- 운영체제 관계없이 동일한 자바버전으로 동일한 종속성 가진 동일 컨테이너를 이미지로 시작하는 것 가능
- 클라우드에서 도커가 실행 가능하고 젠킨스 또한 도커 컨테이너에서 실행 가능
- 최신 컨테이너 이미지를 가져오면 젠킨스를 손쉽게 업그레이드도 가능 ⇒ 볼륨에 별도 보관했던 데이터가 포함된 최신 버전 사용 가능
- 도커 파일을 통해 젠킨스 컨테이너 이미지 수정 가능

<aside>
💡 도커파일 - 어떤 기본 이미지를 사용하는지와 같은 컨테이너를 구축하는 방법을 설명함 기본 이미지는 우분투, 자바 이미지가 될 수 있음

</aside>

- 도커 파일 작성으로 젠킨스 이미지를 커스텀 가능

## 컨테이너 안으로 들어가서 컨테이너 수정 방법

- docker exec [options] container_name command ex) docker exec ws3 pwd, docker exec ls
  - 컨테이너 와 지속적으로 연결 유지하면서 계속 명령을 전달하고 싶을 떄는?
    - docker exec ws3 /bin/sh ⇒ 컨테이너 본 쉘 실행 ⇒ 실행하자마자 쉘 연결 끊김
    - docker exec -it ws3 /bin/bash(배쉬 쉘 실행) ⇒ ws3 컨테이너 안으로 들어감
    - 연결 끊기 ⇒ exit
    - apt update ⇒ apt install nano or vi
    - vi, nano 에디터 를 통해 파일 수정 가능!

<aside>
💡 컨테이너 내부 파일을 수정할 시 컨테이너가 우발적으로 삭제된다면 작업한 파일이 사라져 버린다 그래서 호스트를 통해 파일을 수정하면 그것이 컨테이너 내부에 파일이 수정되도록 하는 방법이 필요

</aside>

## 호스트와 컨테이너의 파일시스템 연결

> 실행 환경은 컨테이너에서, 파일을 수정하는 작업은 호스트에서 진행하는 방법

docker run -p 8888:80 -v ~/Desktop/htdocs:/usr/local/apache2/htdocs/ httpd