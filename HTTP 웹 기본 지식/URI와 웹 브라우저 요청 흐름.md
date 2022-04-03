## URI(Uniform Resource Identifier)

<img src="images/2-1.png">

URI는 로케이터(locator), 이름 또는 둘 다 추가로 분류될 수 있다.

- Uniform: 리소스 식별하는 통일된 방식
- Resource: 자원, URI로 식별할 수 있는 모든 것
- Identifier: 다른 항목과 구분하는데 필요한 정보

## URL, URN

- URL - Locator: 리소스가 있는 위치 지정
- URN - Name: 리소스에 이름을 부여
- 위치는 변할 수 있지만, 이름은 변하지 않음
- URN 이름만으로 실제 리소스를 찾을 수 있는 방법이 보편화 되지 않음

## URL 문법

- shceme://[userinfo@]host[:port][/path][?query][#fragment]
- https://www.google.com:443/search?q=hello&hI=ko
- 프로토콜(https)
- 호스트명(www.google.com)
- 포터 번호(443)
- 패스(/search)
- 쿼리 파라미터(q=hello&hI=ko)

### scheme

- 주로 프로토콜 사용
- 프로토콜: 어떤 방식으로 자원에 접근할 것인가 하는 약속 규칙
  - http, https, ftp 등
- http 는 80, https는 443 포트 주로 사용하고 포트는 생략 가능
- https 는 http에 보안 추가(HTTP Secure)

### userinfo

- URL에 사용자 정보를 포함해서 인증
- 거의 사용하지 않음

### host

- 호스트 명
- 도메인 명 또는 IP 주소를 직접 사용가능

### port

- 접속 포트

### path

- 리소스 경로, 계층적 구조
- 예
  - /home/file1.jpg
  - /members
  - /members/100, /items/iphone12

### query

- key=value 형태
- ?로 시작, &로 추가 가능 ?keyA=valueA&keyB=valueB
- query parameter, query string 등으로 불림, 웹 서버에 제공하는 파라미터, 문자 형태

### fragment

- html 내부 북마크 등에 사용
- 서버에 전송하는 정보가 아니다

## 웹 브라우저 요청 흐름

<img src="images/2-2.png">
