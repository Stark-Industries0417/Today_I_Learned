# docker 주요 명령 익히기

## docker image

- docker는 image와 container 명령이 각각 별도로 존재
- 다음과 같이 image 다루는지, container 다루는지를 명시적으로 이해하기 위해, docker 다음에 image 또는 container 기재함
    
    > image, container 명령어는 어차피 다르므로 굳이 Image, container 붙이지 않아도 되지만 최근에는 키워드를 붙여주는 경향임
    > 
    

<aside>
💡 docker image ls -q ⇒ 다운받은 이미지 아이디만 출력

</aside>

<aside>
💡 docker rmi 이미지ID or 이미지 Repository 이름

</aside>

## docker Container 주요 명령

1. 컨테이너 생성
    - 각 이미지는 컨테이너로 만들어줘야 실행 가능
    - 이미지와 컨테이너는 각각 관리해줘야 함
    - 컨테이너 생성 시, docker 프로그램에서 이름이 자동 부여됨

<aside>
💡 docker create ubuntu ⇒ 실행은 아니고 생성만 하는 명령
docker create —name [이름작성] ⇒ 내가 이름 지정해서 컨테이너 생성

</aside>

1. 생성된 컨테이너 확인

<aside>
💡 docker run [이미지 이름] ⇒ 이미지 다운로드 받고 바로 컨테이너로 만들어 실행시킴
docker ps ⇒ 현재 실행 중인 컨테이너만 확인
docker ps -a 실행되지 않고 있는 모든 컨테이너 까지 확인
docker ps -a -q 모든 컨테이너 id 만 출력
docker rm 컨테이너 name or ID
docker -it —name [컨테이너 이름설정] [이미지 이름]
docker run -it —rm —name [컨테이너 이름설정] [이미지 이름] 
⇒ exit 명령으로 종료 시, 컨테이너도 자동 삭제됨
docker run -it -d —name [컨테이너 이름 설정] [이미지 이름]
⇒ 컨테이너 프로세스를 백그라운드로 실행
docker attach [컨테이너 이름 or ID] ⇒ 백그라운드로 실행 중인 컨테이너로 접속
도커 실행 후 exit 종료한다고 해도 삭제되지는 않음 docker ps -a 로 볼 수 있다

</aside>

1. 컨테이너 실행 

<aside>
💡 docker start [컨테이너 이름] or ID ⇒ 바로 중지됨
- docker는 컨테이너를 하나의 응용 프로그램으로 다루고 있음
docker inspect [컨테이너 이름] or ID 
⇒ “Cmd” : [
       “/bin/sh”,
       “-c”,
       “#(nop) “,
       “CMD [\”/bin/bash\”]”
],
- inspect 결과를 보면 명령이 /bin/bash 배쉬 쉘을 실행하게 되있음
- 해당 명령은 터미널 통해 기보드 입력을 표준 스트림중 표준 입력으로 받을 수 있는 상태이어야
대기 상태로 계속 실행됨 그렇지 않으면 입력을 받을 수 없기에 종료된다.
- 따라서 docker start 했을 시 별도 터미널 및 표준 입력 연결 설정 없이 실행 시, 실행하자마자 끝난다.

</aside>

> 표준 스트림
- 리눅스(유닉스 계열)에서 동작하는 프로그램은 실행 시, 세 개의 스트림(stdin, stdout, stderr)이 오픈됨
- 보통 티머닐 오픈하고 명령 실행 시 터미널의 표준 스트림이 명령에 해당하는 프로세스에 상속되어, 해당 프로세스는 터미널의 표준 입출력 사용할 수 있게 됨
- 터미널 실행 시, 보통은 쉘 프로그램 실행되고, 쉘 프로그램 통해 명령 실행하면 명령에 해당하는 프로그램을 쉘 프로그램이 실행한다.
- 쉘 프로그램 실행 시에 내부적으로 쉘 프로그램은 fork() 시스템콜 사용해서, 명령에 해당하는 프로그램 실행
- fork() 시스템콜 사용 시, 해당 함수를 호출하는 프로그램은 부모 프로세스가 되고, fork()를 통해 실행된 프로그램은 자식 프로세스가 된다.
- 부모 프로세스가 자식 프로세스에 복사되고, 이후에 자식 프로세스 실행에 필요한 데이터가 업데이트 되는 형태로 실행됨
- 부모 프로세스의 표준 입출력은 그대로 자식 프로세스에 복사되기 때문에, 결과적으로 상속과 유사한 기능을 하게 된다.
> 
1. docker run
    - 컨테이너의 입력 (-i 옵션)을 가상 터미널(-t 옵션)에 할당해주어, 결과적으로 PC상에서의 입력이 해당 컨테이너 입력으로 들어갈 수 있게 해줌 
    ⇒ 해당 컨테이너의 bash 쉘은 입력을 받을 수 있는 상태로, 종료되지 않고, 실행 중인 상태가 됨

옵션

-i

-t

—name

-d

—rm

-p

-v

설명

컨테이너 입력(stdin)을 열어놓는 옵션

가상 터미널(tty)을 할당하는 옵션

컨테이너 이름 설정 옵션

컨테이너를 백그라운드에서 실행하는 옵션

컨테이너 종료 시 컨테이너를 자동 삭제하는 옵션

호스트와 컨테이너 포트 연결하는 옵션

호스트와 컨테이너 디렉토리 연결하는 옵션

<aside>
💡 pseudo tty 란
- tty는 teletypewriter의 약자로, 리눅스(유닉스 계열)에서는 콘솔 또는 터미널 의미
- tty를 통해 리눅스에 키보드 입력을 전달할 수 있으며, 하나의 tty 이외에 다양한 터미널에서 접속을 지원하기 위해, 두 번째 tty 부터 가상(pseudo) 이라는 말이 붙어서 pseudo tty 라고 한다

</aside>

1. 실행 중인 컨테이너 종료하기

<aside>
💡 docker stop [컨테이너 이름] ⇒ 종료한 컨테이너는 docker start 명령으로 재실행 가능
docker pause ⇒ 실행 중인 컨테이너의 실행 상태 중지
docker unpause ⇒ 멈춘 컨테이너 다시 실행
docker restart
docker search 
docker search [이름] —limit=5 검색을 5개로 제한해서 보여준다

</aside>

**docker run -d —name apacheweb httpd**

- 해당 웹 서버에 어떻게 접속해야할지 알 수 없음
- docker 실행한 PC ⇒ 호스트 PC
- docker 컨테이너 실행되면, 172.17.0.0/16 (서브넷이 255.255.0.0) 인 private IP가 할당됨
    - /16은 16비트까지 IP 할당 된다는 의미로, 172.17.0.0 ~ 172.17.255.255 까지 동일 네트워크 상에 IP 주소를 가질 수 있음을 의미
- 호스트PC IP에 특정 포트로 access 시, 해당 포트를 docker 컨테이너의 특정 private IP 의 특정 포트로 변환해 줄 수 있다. 이를 NAPT(Network Address Port Traslation) 기술이라 함
⇒ 이를 지원하는 옵션이 -p 옵션이다.

**docker run -d -p 9999:80 —name apacheweb2 httpd**

⇒ apacheweb2 컨테이너는 apache 웹 서버 프로그램 실행하고, 호스트 PC에 9999 포트로 접속하면, 자동으로 이를 해당 컨테이너의 80 포트에 연결해주는 의미