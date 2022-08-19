# 목차

2. [Application Layer](#2-application-layer)

- [Application architectures](#application-architectures)
- [sockets](#sockets)
- [TCP service](#tcp-service)
- [UDP service](#udp-service)

# 2. Application Layer

## Application architectures

- client-server
- peer-to-peer(P2P)

### server

- always-on host
- permanent IP address
- data centers for scaling

### clients

- only communicate with server
- do not communicate directly with each other
- may be intermittently connected
- may have dynamic IP address

transport 계층 이하는 운영체제가 controll 한다

## Sockets

application 계층과 transport 계층 사이에 존재하는 소켓을 통해 데이터를 보내고 받아들인다.

## TCP service:

- reliable transport between sending and receiving process
- connection-oriented: 3-handshake 진행
- flow control: TCP 계층에선 버퍼의 공간이 넘치지 않도록 속도를 조절 시킬 수 있다.
- congestion control: 네트워크 내에 라우터들의 버퍼가 넘치지 않도록 속도 조절 시킬 수 있음

## UDP service:

목적지 호스트에서 포트로 전달해주는 역할

- unreliable data transfer
