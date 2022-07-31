# 목차

1. [Introduction to operating systems](#introduction-to-operating-systems)
   - [운영체제란?](#운영체제란)
   - [운영 체제의 목표](#운영-체제의-목표)
2. [System Structure & Program Execution](#2-system-structure--program-execution)
   - [Mode-bit](#mode-bit)
   - [Timer](#timer)
   - [장치 제어기](#io-device-controller)
   - [입출력 io의 수행](#입출력-io의-수행)
   - [인터럽트](#인터럽트)
   - [동기식, 비동기식 입출력](#동기식-입출력과-비동기식-입출력)
   - [DMA(Direct memory access)](#dmadirect-memory-access)
   - [프로그램의 실행 과정](#프로그램의-실행)
3. [Process](#3-process-1)
   - [프로세스의 개념](#프로세스의-개념)
   - [프로세스의 문맥](#프로세스의-문맥context)
   - [프로세스의 상태](#프로세스의-상태)
   - [Process Control Block](#process-control-block-pcb)
   - [문맥 교환](#문맥-교환context-switch)
   - [스케줄러](#스케줄러)
   - [Thread](#thread)
   - [Thread의 구성](#thread의-구성)
   - [Thread 장점](#thread-장점)
   - [Thread가 동료 thread와 공유하는 부분](#thread가-동료-thread와-공유하는-부분)
4. [Process Management](#4-process-management)
   - [프로세스 생성](#프로세스-생성)
   - [프로세스 종료](#프로세스-종료)
   - [wait 시스템 콜](#wait-시스템-콜)
   - [exit 시스템 콜](#exit-시스템-콜)
   - [프로세스 간 협력](#프로세스-간-협력)
   - [message-passing](#message-passing)
   - [프로세스의 특성 분류](#프로세스의-특성-분류)
   - [CPU Scheduler](#cpu-scheduler)
   - [Dispatcher](#dispatcher)

# 1. Introduction to operating systems

## 운영체제란?

컴퓨터 하드웨어 바로 위에 설치되어 사용자 및 다른 모든 소프트웨어와 하드웨어를 연결하는 소프트웨어 계층

## 운영 체제의 목표

- 운영체제는 동시 사용자/프로그램들이 각각 독자적 컴퓨터에서 수행되는 것 같은 경험을 제공
- 컴퓨터 시스템을 편리하게 사용할 수 있는 환경 제공
- 하드웨어를 직접 다루는 복잡한 부분을 운영체제가 대행
- **컴퓨터 시스템의 자원(프로세서, 기억장치, 입출력 장치 등)을 효율적으로 관리**
- 사용자간의 형평성 있는 자원 분배
- 주어진 자원으로 최대한의 성능 내도록

> 좁은 의미의 운영체제 -> 커널: 운영체제의 핵심 부분으로 메모리에 상주하는 부분
> 넓은 의미의 운영체제 -> 커널 뿐 아니라 각종 주변 시스템 유틸리티 포함한 개념

## 운영체제의 처리 방식

### 일괄 처리(batch processing)

- 작업 요청의 일정량 모아서 한꺼번에 처리
- 작업이 완전 종료될 때까지 기다려야 함

## 시분할

- 여러 작업을 수행할 때 컴퓨터 처리 능력 일정한 시간 단위로 분할하여 사용
- 일괄 처리 시스템에 비해 짧은 응답 시간 가짐 ex) UNIX
- Interactive 한 방식

## 실시간

- 정해진 시간 안에 어떠한 일이 반드시 종료됨이 보장되어야 하는 실시간 시스템을 위한 OS
- 원자로/공장 제어, 미사일 제어, 반도체 장비, 로보트 제어

[돌아가기](#목차)

# 2. System Structure & Program Execution

## Mode bit

- 사용자 프로그램의 잘못된 수행으로 다른 프로그램 및 운영체제에 피해 가지 않도록 하기 위한 보호 장치 필요
- Mode bit 통해 하드웨어적 두 가지 모드의 operation 지원
  1 -> 사용자 모드: 사용자 프로그램 수행
  0 -> 모니터 모드(커널 모드, 시스템 모드): OS 코드 수행
- 보안 해칠 수 있는 중요 명령어는 모니터 모드에서만 수행 가능한 특권명령으로 규정
- Interrupt나 Exception 발생 시 하드웨어가 mode bit 0으로 바꿈
- 사용자 프로그램 CPU 넘기기 전에 mode bit 1로 셋팅

## Timer

- 정해진 시간 흐른 뒤 운영체제에게 제어권 넘기도록 인터럽트 발생시킴
- 타이머는 매 클럭 틱 때마다 1씩 감소
- 타이머 값이 0이 되면 타이머 인터럽트 발생
- CPU를 특정 프로그램이 독점하는 것으로부터 보호

## IO Device Controller

- IO 장치유형 관리하는 일종의 작은 CPU
- 제어 정보 위해 control register, status register 가짐
- local buffer 가짐(일종의 data register)
- I/O는 실제 device와 local buffer 사이에서 일어남
- Device controller는 I/O 끝낫을 경우 interrupt로 CPU에 그 사실 알림

#### device driver(장치 구동기)

- OS 코드 중 각 장치별 처리 루틴

#### device controller(장치 제어기)

- 각 장치 통제하는 일종의 작은 CPU

## 입출력 (I/O)의 수행

- 사용자 프로그램이 어떻게 I/O 하는가
- 시스템콜 -> 사용자 프로그램은 운영체제에게 I/O 요청
- trap 사용하여 인터럽트 벡터의 특정 위치로 이동
- 제어권이 인터럽트 벡터가 가리키는 인터럽트 서비스 루틴으로 이동
- 올바른 I/O 요청인지 확인 후 I/O 수행
- I/O 완료 시 제어권을 시스템콜 다음 명령으로 옮김

## 인터럽트

- 인터럽트 당한 시점의 레지스터와 프로그램 counter를 save 한 후 CPU의 제어를 인터럽트 처리 루틴에 넘긴다.
  넓은 의미의 인터럽트
- 하드웨어 인터럽트: 하드웨어가 발생시킨 인터럽트
- trap(소프트웨어 인터럽트)
  - Exception: 프로그램이 오류를 범한 경우
  - System call: 프로그램이 커널 함수를 호출하는 경우

### 인터럽트 벡터

=> 해당 인터럽트의 처리 루틴 주소를 가지고 있음

### 인터럽트 처리 루틴 (= 인터럽트 핸들러)

=> 해당 인터럽트를 처리하는 커널 함수

## 동기식 입출력과 비동기식 입출력

### 동기식 입출력

- I/O 요청 후 입출력 작업 완료된 후에야 제어가 사용자 프로그램에 넘어감

### 구현 방법 1

- I/O가 끝날 때까지 CPU 낭비시킴
- 매시점 하나의 I/O만 일어날 수 있음

### 구현 방법 2

- I/O가 완료될 때까지 해당 프로그램에게서 CPU 빼앗음
- I/O 처리를 기다리는 줄에 그 프로그램을 줄 세움
- 다른 프로그램에게 CPU 줌

### 비동기식 입출력

- I/O가 시작된 후 입출력 작업 끝나기를 기다리지 않고 제어가 사용자 프로그램에 즉시 넘어감

**두 경우 모두 I/O의 완료는 인터럽트로 알려줌**

## DMA(Direct Memory Access)

- 메모리에 접근할 수 있는 장치
- I/O 장치의 CPU 인터럽트가 너무 잦으므로 DMA를 이용해 블럭 단위의 device 버퍼에 있는 데이터를 메모리에 복사하고 CPU에 알림
- 바이트 단위가 아닌 블록 단위로 인터럽트 발생시킴

## 프로그램의 실행

1. 프로그램이 실행되면 프로세스 별 독자적인 메모리 주소공간이 형성된다.
2. 주소공간에는 code(기계어 코드), data(전역변수, 자료구조 등), stack(함수 호출과 리턴 할 때 사용됨) 영역으로 구성되어있다.
3. 이 가상메모리를 주 메모리에 모두 복사하는 것이 아닌 당장 실행할 부분인 일부분을 복사하여 사용 -> 메모리 낭비하지 않기 위해
4. 사용되지 않는 부분은 디스크의 swap area에 저장

[돌아가기](#목차)

# 3. Process 1

## 프로세스의 개념

- Process is a program in execution

## 프로세스의 문맥(context)

> CPU 는 여러 프로세스를 시분할로 나눠 처리하므로 각 프로세스가 어느 code 까지 실행되었는지, data 부분의 변경된 부분과, 함수의 실행으로 stack의 바뀐 점, register에는 어떤 값을 저장했는지 등 각 프로세스의 변경사항을 파악하고 있어야 한다.

- CPU 수행 상태를 나타내는 하드웨어 문맥(프로세스의 현재 상태를 나타내는데 필요한 모든 요소)

  - Program Counter
  - 각종 register

- 프로세스의 주소 공간
  - code, data, stack
- 프로세스 관련 커널 자료 구조
  - PCB(Process Control Block)
  - Kernel stack

## 프로세스의 상태

- Running: CPU 잡고 instruction 수행중인 상태
- Ready: CPU 기다리는 상태(메모리 등 다른 조건 모두 만족하고)
- Blocked(wait, sleep)

  - CPU 주어도 장장 instruction 수행할 수 없는 상태
  - Process 자신이 요청한 event(ex: I/O)가 즉시 만족되지 않아 이를 기다리는 상태
  - ex) 디스크에서 file 읽어와야 하는 경우

- Suspended
  - 외부적인 이유로 프로세스의 수행이 정지된 상태
  - 프로세스는 통쨰로 디스크에 swap out 된다.
  - ex) 사용자가 프로그램을 일시 정지시킨 경우(break key)
    시스템이 여러 이유로 프로세스를 잠시 중단시킴
    (메모리에 너무 많은 프로세스가 올라와 있을 때)
- New: 프로세스가 실행중인 상태
- Terminated: 수행이 끝난 상태

## Process Control Block (PCB)

- 운영체제가 각 프로세스를 관리하기 위해 프로세스당 유지하는 정보
- 다음의 구성 요소를 가짐(구조체로 유지)

1. OS가 관리상 사용하는 정보

   - Process state, Process ID
   - 스케줄링 정보, priority

2. CPU 수행 관련 하드웨어 값

   - Program counter, registers

3. 메모리 관련

   - Code, data, stack의 위치 정보

4. 파일 관련

   - Open file descriptors

## 문맥 교환(Context Switch)

- CPU를 한 프로세스에서 다른 프로세스로 넘겨주는 과정
- CPU가 다른 프로세스에게 넘어갈 때 운영체제는 다음을 수행
  - CPU를 내어주는 프로세스의 상태를 그 프로세스의 PCB에 저장
  - CPU를 새롭게 얻는 프로세스의 상태를 PCB에서 읽어옴

1. 프로세스 A -> 커널 모드(system call)함수 -> 프로세스 A => 문맥교환 아님
2. 프로세스 A -> 커널 모드 -> 프로세스 B => 문맥 교환

문맥 교환의 경우 다른 프로세스로 CPU 전달 시에 cache memory를 휘발 시켜야 한다. => 오버헤드가 크다.

## 스케줄러

### 장기 스케줄러(job scheduler)

- 시작 프로세스 중 어떤 것들을 ready queue로 보낼지 결정
- 프로세스에 memory(및 각종 자원)을 주는 문제
- degree of Multipromgramming을 제어
- time sharing system에는 보통 장기 스케줄러가 없음(무조건 ready)

> degree of multiprogramming => 메모리에 프로세스가 올라가 있는 개수를 제어한다.
> 너무 많은 프로세스가 메모리에 올라가 있으면 프로세스별 가지는 메모리가 적게되어 필요한 메모리를 얻으려 디스크 연산이 많아져 성능이 떨어질 수 있다.
> 너무 적은 프로세스가 메모리에 올라가 있어도 다음 프로세스를 CPU가 처리하지 못해 성능이 떨어질 수 있다.

### 단기 스케줄러(CPU scheduler)

- 어떤 프로세스를 다음번에 running 시킬지 결정
- 프로세스에 CPU 주는 문제
- 충분히 빨라야함 (millisecond 단위)

### 중기 스케줄러(swapper)

- 여유 공간 마련 위해 프로세스를 통째로 메모리에서 디스크로 쫓아냄
- 프로세스에게서 memory를 뺏는다
- degree of multiprogramming을 제어

## Thread

> 프로세스 하나에 CPU 수행 단위만 여러개 두고 있는 것을 쓰레드 라고한다.

같은 일을 하는 프로세스가 여러 개 있다면 모두 가상 메모리로 주소 공간을 할당한다면 메모리 낭비가 되므로 하나의 주소공간에서 프로세스 다른 부분의 code 부분을 실행하기 위한 것

## Thread의 구성

- program counter -> 어느 부분의 코드를 수행하고 있는지 나타냄
- register set
- stack space

## Thread가 동료 thread와 공유하는 부분

- code section
- data section
- os 자원

## Thread 장점

- 다중 스레드로 구성된 태스크 구조에선 하나의 서버 스레드가 blocked 상태인 동안에도 동일한 태스크 내의 다른 스레드가 실행 되어 빠른 처리를 할 수 있다.
- 동일한 일을 수행하는 다중 스레드가 협력하여 높은 처리율(throughput)과 성능 향상을 얻을 수 있다.
- 스레드를 사용하면 병렬성을 높일 수 있다.

[돌아가기](#목차)

# 4. Process Management

## 프로세스 생성

- 부모 프로세스가 자식 프로세스 생성
- 프로세스의 트리(계층 구조) 형성
- 프로세스는 자원을 필요로 함
  - 운영체제로부터 받는다
  - 부모와 공유한다
- 자원의 공유
  - 부모와 자식이 모든 자원을 공유하는 모델
  - 일부를 공유하는 모델
  - 전혀 공유하지 않는 모델
- 프로세스가 실행 될 때

  - 부모와 자식은 공존하며 수행되는 모델
  - 자식이 종료 될 때까지 부모가 기다리는 모델

- 주소 공간

  - 자식은 부모의 공간을 복사함(PCB, 자원 등)
  - 자식은 그 공간에 새로운 프로그램 올림

- 유닉스 인 경우
  - fork() 시스템 콜이 새로운 프로세스를 생성
  - 부모를 그대로 복사
  - 주소 공간 할당
  - fork 다음에 이어지는 exec() 시스템 콜 통해 새로운 프로그램을 메모리에 올림

## 프로세스 종료

- 프로세스가 마지막 명령 수행한 후 운영체제에게 이를 알려줌 (프로세스 자발적 종료: exit)
  - 자식이 부모에게 output data를 보냄
  - 프로세스의 각종 자원들이 운영체제에게 반납됨
- 부모 프로세스가 자식의 수행을 종료시킴(비 자발적으로 종료 abort)
  - 자식이 할당 자원의 한계치를 넘어선 요청 한 경우
  - 자식에게 할당된 태스크가 더 이상 필요하지 않음(할 일이 없을 경우)
  - 부모가 종료(exit)하는 경우
    - 운영체제는 부모 프로세스가 종료하는 경우 자식이 더 이상 수행되도록 두지 않음
    - 단계적인 종료: 손자 부터 자식 본인까지 단계적으로 종료시킴

## wait() 시스템 콜

- 프로세스 A가 wait() 시스템 콜 호출하면
- 커널은 child가 종료될 때까지 프로세스 A sleep 시킴(block 상태)
- Child process 가 종료되면 커널은 프로세스 A를 깨운다(ready 상태)

## exit() 시스템 콜

- 자발적 종료

  - 마지막 statement 수행 후 exit() 시스템 콜 통해 종료
    - 프로그램에 명시적으로 적어주지 않아도 main 함수가 리턴되는 위치에 컴파일러가 넣어줌

- 비자발적 종료

  - 부모 프로세스가 자식 프로세스를 강제 종료시킴
    - 자식 프로세스가 한계치 넘어서는 자원 요청
    - 자식에게 할당된 태스크가 더 이상 필요하지 않음
  - 키보드로 kill, break 등을 친 경우
  - 부모가 종료하는 경우
    - 부모 프로세스가 종료하기 전에 자식들이 먼저 종료됨

## 프로세스 간 협력

- 독립적 프로세스
  프로세스는 각자의 주소 공간을 가지고 수행되므로 원칙적으로 하나의 프로세스는 다른 프로세스의 수행에 영향을 미치지 못함

- 협력 프로세스
  프로세스 협력 메커니즘 통해 하나의 프로세스가 다른 프로세스의 수행에 영향 미칠 수 있음

- 프로세스 간 협력 메커니즘(IPC: Interprocess Communicatioin)

  - 메시지 전달 방법
    - message passing: 커널 통해 메시지 전달
  - 주소 공간 공유하는 방법
    - shared memory
      서로 다른 프로세스 간에도 일부 주소 공간을 공유하게 하는 shared memory 메커니즘이 있음
    - thread: thread는 사실상 하나의 프로세스 이므로 프로세스 간 협력으로 보긴 어렵지만 동일한 process를 구성하는 thread들 간에는 주소 공간을 공유하므로 협력이 가능

## Message Passing

> 프로세스 사이에 공유 변수를 일체 사용하지 않고 통신하는 시스템

- Direct Communication: 통신하려는 프로세스의 이름을 명시적 표시
- Indirect Communication: mailbox or port를 통해 메시지를 간접 전달

## 프로세스의 특성 분류

- I/O-bound process
  - CPU 잡고 계산하는 시간보다 I/O에 많은 시간 필요한 job
  - many short CPU bursts
- CPU-bound process
  - 계산 위주의 job
  - few very long CPU bursts

## CPU Scheduler

- Ready 상태의 프로세스 중에서 이번에 CPU를 줄 프로세스를 고른다.

## Dispatcher

- CPU의 제어권을 CPU scheduler에 의해 선택된 프로세스에게 넘긴다.
- 이 과정을 context switch(문맥 교환)라고 한다.

[돌아가기](#목차)
