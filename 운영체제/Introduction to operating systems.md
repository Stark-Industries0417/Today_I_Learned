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
5. [CPU Scheduling](#5-cpu-scheduling-1)

   - [스케쥴링 성능 척도](#scheduling-criteria성능-척도)
   - [Scheduling algorithms](#scheduling-algorithms)
   - [Cpu Burst time 예측](#cpu-burst-time-예측)
   - [Multilevel-Queue](#multilevel-queue)
   - [Thread Scheduling](#thread-scheduling)

6. [Process Synchronization](#6-process-synchronization)

   - [process 동기화 문제 발생하는 상황](#process-동기화-문제-발생하는-상황)
   - [race condition](#race-condition)
   - [Semaphores](#semaphores)
   - [프로그램적 해결법의 충족 조건](#프로그램적-해결법의-충족-조건)
   - [Busy waiting](#busy-waitingspin-lock)
   - [Semaphores](#semaphores)
   - [implementation block wake up](#implementation-blockwakeup-version-of-p--v)
   - [Two types of semaphores](#two-types-of-semaphores)
   - [Deadlock](#deadlock)
   - [Starvation](#starvation) -[Dining Philosophers Problem](#dining-philosophers-problem)
   - [철학자 문제 해결방안](#해결방안)

7. [Deadlocks(교착 상태)](#7장-deadlocks교착-상태)
   - [Deadlock](#deadlock)
   - [Resource](#resource)
   - [Deadlock example](#deadlock-example)
   - [Deadlock 발생 4가지 조건](#dadlock-발생의-4가지-조건)
   - [Deadlock 처리 방법](#deadlock-처리-방법)
8. [Memory management](#8-memory-management)

   - [Logical address](#logical-addressvirtual-address)
   - [Physical address](#physical-address)
   - [주소 바인딩](#주소-바인딩address-binding)
   - [memory management unit](#memory-management-unitmmu)
   - [Swapping](#swapping)
   - [Paging](#paging)
   - [Page Table](#page-table)
   - [TLB](#tlb)
   - [Segmentation](#segmentation)
   - [Segmentation with Paging](#segmentation-with-paging)
   - [Demand Paging](#demand-paging)
   - [Page Fault](#page-fault)
   - [Free Frame이 없는 경우](#free-frame이-없는-경우os가-작업)
   - [Page Replacement 순서](#page-replacement-순서)
   - [Optimal Algorithm](#optimal-algorithm---page-fault가-가장-적은-알고리즘)
   - [FIFO Algorithm](#fifo-algorithm)
   - [LRU](#lru)
   - [LFU](#lfu)
   - [LRU, LFU 알고리즘의 구현](#lru와-lfu-알고리즘의-구현)
   - [Page System](#page-system)
   - [Clock Algoritym](#clock-algorithm)
   - [Page frame의 Allocation](#page-frame의-allocation)
   - [Thrashing](#thrashing)
   - [Working set model](#working-set-model)

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

# 5. CPU Scheduling 1

## Scheduling Criteria(성능 척도)

### 시스템 입장에서의 성능 척도

- CPU utilization(이용료): keep the CPU as busy as possible
  전체 시간 중 CPU 가 일한 시간의 비율
- Throughput(처리량): of processes that complete their execution per time unit
  주어진 시간동안 몇개의 일을 처리했는지

### 프로세스 입장에서의 성능 척도

- Turnaround time(소요시간, 변환시간): amount of time to execute a particular process
  프로세스가 CPU 사용하고 반답한 시간의 총 시간
- Waiting time(대기 시간): amount of time a process has been waiting in the ready queue
  프로세스가 끝나기 까지 ready queue 에서 CPU 할당받기 위해 총 기다린 시간
- Response time(응답 시간): amount of time it takes from when a request was submitted until the first response is produced. not output
  ready queue에 들어와서 최초의 CPU 얻기까지의 시간

## Scheduling Algorithms

### FCFS(First-Come First-Served)

> 비 선점형

먼저 온 순서대로 처리
ex) 은행 번호표

### SJF(Shortest-Job-First)

CPU burst time이 가장 짧은 프로세스에게 먼저 주는 것

- Nonpreemptive: 일단 CPU 잡으면 이번 CPU burst가 완료될 때까지 CPU를 뺏기지않음
- Preemptive: 현재 프로세스의 남은 burst time 보다 더 짧은 CPU burst time 가지는 새로운 프로세스 도착하면 CPU를 빼앗김

**문제점**
CPU burst time이 긴 프로세스가 CPU를 할당받지 못할 수 있음

**해결법**
aging(노화): as time progresses increase the priority of the process
오래 기다리면 우선순위 높여주는 방식

## CPU Burst Time 예측

- 오로지 추정만 가능하다
- 과거의 CPU burst time을 이용해서 추정

### Priority Scheduling

- 높은 우선순위 가진 프로세스에게 CPU 할당
- preemptive
- nonpreemptice

### Round Robin(RR)

- 각 프로세스는 동일한 크기의 할당 시간 가짐
- 할당 시간이 지나면 프로세스는 preempted 당하고 ready queue 의 제일 뒤에 가서 다시 줄을 슨다.
- n개의 프로세스가 ready queue에 있고 할당 시간이 q time unit인 경우 각 프로세스는 최대 q time unit 단위로 CPU 시간의 1/n을 얻는다.
  => 어떤 프로세스도 (n-1)q time unit 이상 기다리지 않는다.

## Multilevel Queue

- Ready queue를 여러 개로 분할
  - foreground(interactive) => 사용자와 상호작용이 필요하므로 응답시간이 짧은 RR 스케줄링 알고리즘이 적합
  - background(batch - no human interaction) => 빠른 응답 요청이 필요하지 않으므로 context switch 오버헤드 줄일 수 있는 FCFS 가 적합하다.
- 큐에 대한 스케줄링 필요
  - Fixed priority scheduling
  - Time slice

## Thread Scheduling

- Local Scheduling
  User level thread의 경우 사용자 수준의 thread library에 의해 어떤 thread를 스케줄 할지 결정
  (운영체제는 쓰레드의 존재를 모름)
- Global Scheduling
  Kernel level thread의 경우
  (운영체제가 쓰레드의 존재를 암)

# 6. Process Synchronization

## process 동기화 문제 발생하는 상황

- 공유 데이터의 동시 접근하여 데이터 불일치 문제
- 일관성 유지 위해 협력 프로세스 간의 실행순서 정해주는 메커니즘 필요

1. kernel 수행 중 인터럽트 발생 시
2. Process가 system call 하여 kernel mode로 수행 중인데 context switch 일어나는 경우
3. Multiprocessor에서 shared memory 내의 데이터 접근하는 경우
   => 해결법
   1. 커널 내부 공유 데이터에 접근하면 lock 을 걸어 다른 CPU가 접근못하게 하고 변경 후 저장되면 unlock 하는 방법(커널 전체를 lock/unlock 하는 방법 => 비효율적 커널에 하나의 CPU만 들어갈 수 있으므로)
   2. 한번에 하나의 CPU만이 커널에 들어갈 수 있게 하는 방법

## Race condition

- 여러 프로세스들이 동시에 공유 데이터를 접근하는 상황
- 데이터의 최종 연산 결과는 마지막에 그 데이터를 다룬 프로세스에 따라 달라짐

## 프로그램적 해결법의 충족 조건

### Mutual Exclusion (상호 배제)

프로세스 P가 critical section 부분 수행중이면 다른 모든 프로세스들은 그들의 critical section에 들어가면 안된다.

### Progress

아무도 critical section에 있지 않은 상태에서 critical section에 들어가고자 하는 프로세스가 있으면 critical sectioin에 들어가게 해주어야 한다.

### Bounded waiting

프로세스가 critical section에 들어가려고 요청한 후부터 그 요청 허용될 때까지 다른 프로세스들이 critical section에 들어가는 횟수에 한계가 있어야 함

## Busy Waiting(=spin lock)

계속 CPU와 memory 쓰면서 wait

## Semaphores

**Semaphore S**
S -> 자원의 개수

- integer variable
- 아래 두 가지 연산에 의해서만 접근 가능

```
자원 할당
P(S)
while(S <= 0) do wait
s--;

자원 반납
V(S)
S++
```

## Implementation block/wakeup version of P() & V()

```
P(S)
S.value --;
if S.value < 0 {
  add this process to S.L;
  block()
}

V(S)
S.value ++;
if(S.value <= 0) {
  remove a process P from S.L;
  wakeup(P)
}
```

## Two Types of Semaphores

- Counting semaphore
  - 도메인이 0 이상인 임의의 정수값
  - 주로 resource counting에 사용
- Binary semaphore(=mutex)
  - 0 또는 1 값만 가질 수 있는 semaphore
  - 주로 mutual exclusion (lock/unlock)에 사용

## DeadLock

- 둘 이상의 프로세스가 서로 상대방에 의해 충족될 수 있는 event를 무한히 기다리는 현상

자원 획득하는 순서를 맞추면 해결 가능

## starvation

프로세스가 suspend 된 이유에 해당하는 세마포어 큐에서 빠져나갈 수 없는 현상

## Dining-Philosophers problem

모든 철학자가 동시에 배가 고파져 왼쪽 젓가락을 집어버린 경우 데드락 발생

## 해결방안

- 4명의 철학자만이 테이블에 동시에 앉을 수 있게 함
- 젓가락을 두 개 모두 집을 수 있을 때에만 젓가락으 집을 수 있게 한다
- 짝수(홀수) 철학자는 왼쪽(오른쪽) 젓가락부터 집도록한다.

[돌아가기](#목차)

# 7장 Deadlocks(교착 상태)

## Deadlock

일련의 프로세스들이 서로가 가진 자원을 기다리며 block된 상태

## Resource

- 하드웨어, 소프트웨어 등을 포함하는 개념
- ex) I/O device, CPU cycle, memory space, semaphore 등
- 프로세스가 자원을 사용하는 절차
  1. Request
  2. Allocate
  3. Use
  4. Release

## Deadlock example

1. 시스템에 2개의 tape drive 가 있는데
   프로세스 p1, p2가 하나의 tape drive를 보유한 채 다른 하나를 기다리고 있는 상황

2. 이진 세마포어(뮤텍스) A and B가 있는데 P1, P2 가 있는 상황 중
   P1 이 p(A), P(B) 를 통해 임계 구역에 들어가고 싶은데
   P2 는 P(B), P(A) 를 가지고 싶어 두 프로세스가 임계 구역에 들어가지 못하는 상황

## Dadlock 발생의 4가지 조건

1. Mutual exclusion(상호 배제)
   매 순간 하나의 프로세스만이 자원을 사용할 수 있음
2. No Preemption(비선점)
   프로세스는 자원을 스스로 내어놓을 뿐 강제로 빼앗기지 않음
3. Hold and Wait(보유 대기)
   자원을 가진 프로세스가 다른 자원을 기다릴 때 보유 자원을 놓지 않고 계속 가지고 있음
4. Circular wait(순환 대기)
   자원을 기다리는 프로세스간에 사이클이 형성되어야 함
   프로세스 p0,p1,p2 ... pn이 있을 때
   p0은 p1이 가진 자원 기다림
   p1은 p2가 가진 자원 기다림
   pn-1은 pn이 가진 자원 기다림
   Pn은 p0이 가진 자원 기다림

## Deadlock 처리 방법

### Deadlock 미연에 방지하는 방법

- Deadlock Prevention
  자원 할당 시 Deadlock의 4가지 필요 조건 중 어느 하나가 만족되지 않도록 하는 것

- Deadlock Avoidance
  - 자원 요청에 대한 부가적인 정보 이용해서 deadlock 가능성 없는 경우에만 자원 할당
  - 시스템 state가 원래 state로 돌아올 수 있는 경우에만 자원 할당

### Deadlock 생긴 후 처리하는 방법

- Deadlock Detection and recovery
  Deadlock 발생은 허용하되 그에 대한 detection 루틴 두어 deadlock 발견시 recover
- Deadlock Ignorance
  Deadlock을 시스템이 책임지지 않음
  유닉스 포함한 대부분의 OS가 채택

[돌아가기](#목차)

# 8. Memory Management

## Logical address(virtual address)

- 프로세스마다 독립적으로 가지는 주 공간
- 각 프로세스마다 0번지 부 시작
- CPU가 보는 주소는 logical address

## Physical address

메모리에 실제 올라가는 위치

## 주소 바인딩(Address Binding)

### Compile time binding

- 물리적 메모리 주소가 컴파일 시 알려짐
- 시작 위치 변경시 재컴파일
- 컴파일러는 절대 코드 생성

### Load time binding

실행 시에 주소가 결정됨

- Loader의 책임하에 물리적 메모리 주소 부여
- 컴파일러가 재배치 가능코드를 생성한 경우 가능

### Execution time binding(=Run time binidng)

- 수행이 시작된 이후에도 프로세스의 메모리 상 위치를 옮길 수 있음
- CPU가 주소 참조할 때마다 binding 점검
- 하드웨어적인 자원이 필요

## Memory Management Unit(MMU)

logical address 를 physical address로 매핑해 주는 하드웨어 device

- MMU scheme
  사용자 프로세스가 CPU에서 수행되며 생성해내는 모든 주소값에 대해 base register(relocation register)의 값을 더 한다

- user program
  logical address만을 다룸
  실제 physical address를 볼 수 없으며 알 필요가 없음

## Swapping

프로세스를 일시적으로 메모리에서 backing store(디스크)로 쫓아내는 것

## Paging

- Process의 가상 메모리를 동일한 사이즈의 page 단위로 나눔
- 가상 메모리의 내용이 page 단위로 noncontiguaous(비연속적)하게 저장됨
- 일부는 backing storage에 일부는 physical memory에 저장

1. physical memory를 동일한 크기의 frame으로 나눔
2. logical memory를 동일 크기의 page로 나눔(frame과 같은 크기)
3. page table 사용하여 logical address를 physical address로 변환
4. external fragmentation 발생 안함
5. internal fragmentation 발생 가능

## Page Table

- 메인 메모리에 상주
- 모든 메모리 접근 연산에는 2번의 메모리 access 필요
- page table 접근 1번, 실제 data/instruction 접근 1번
- 속도 향상 위해 associative register 혹은 translation look-aside buffer(TLB)라 불리는 고속의 lookup hardware cache 사용

## TLB

- 주소 변환을 위한 캐시 메모리
- page table 중 일부가 TLB에 보관
- 해당 page가 associative register에 있는 경우 곧바로 frame 얻음
- 그렇지 않은 경우 main memory에 있는 page table로 부터 frame 얻음
- 프로세스마다 page table이 따로 있으므로 TLB는 context switch 때 휘발된다.

## Segmentation

프로그램을 의미 단위인 segment로 구성

- 작게는 프로그램을 구성하는 함수 하나하나를 세그먼트로 정의
- 크게는 프로그램 전체를 하나의 세그먼트로 정의 가능
- 일반적으로는 code, data, stack 부분이 각각 세그먼트로 정의 됨

세그먼트는 각각 크기가 다르므로 세그먼트 테이블은 limit 과 base 값을 가지고 있다.

## Segmentation with Paging

segment 하나를 여러 page 단위로 나눔

- segment-table entry가 segment의 base address 가지고 있는 것이 아닌 segment 구성하는 page table의 base address를 가지고 있음
- segment 당 page table 존재

allocation 문제 발생하지 않음 -> 메모리에 hole 생기지 않음

[돌아가기](#목차)

# 9. Virtual Memory

## Demand Paging

메모리가 페이징 기법 사용 시 실제로 필요할 때 page를 메모리에 올리는 것

- 디스크 I/O 양의 감소
- Memory 사용량 감소
- 빠른 응답 시간
- 더 많은 사용자 수용

### Valid/Invalid bit의 사용

- Invalid의 의미
  - 사용되지 않는 주소 영역(정해진 가상 메모리를 주어지는데 프로세스가 주어진 메모리를 다 사용하지 않는 경우)
  - 페이지가 물리적 메모리에 없는 경우
- 처음엔 모든 page entry가 invalid로 초기화
- 주소 변환시에 invalid bit으로 set 되어 있으면
  => page fault 라고 한다.

## Page Fault

- invalid page 접근하면 MMU가 trap 발생시킴
- Kernel mode로 들어가서 page fault handler가 실행됨
- 다음 순서대로 page fault 처리
  1. Invalid reference? (bad address, protection violation) 인지 확인 => abort
  2. Get an empty page frame(없으면 뺏어온다: replace)
  3. 해당 페이지를 disk에서 memory로 읽어온다
     1. disk I/O 끝나기까지 프로세스는 CPU를 preempt 당함 (block)
     2. Disk read 끝나면 page tables entry에 기록하고
        valid/invalid bit = valid로 기록
        ready queue에 프로세스를 insert
  4. 이 프로세스가 CPU 잡고 다시 running
  5. 아까 중단되었던 instruction 재개

## Free frame이 없는 경우(OS가 작업)

- Page replacement
  - 어떤 frame 빼앗아올지 결정해야 함
  - 곧바로 사용되지 않을 page 쫓아내는 것이 좋음
  - 동일한 페이지가 여러 번 메모리에서 쫓겨났다가 다시 들어올 수 있음
- Replacement Algorithm
  - page-fault rate 최소화하는 것이 목표
  - 알고리즘의 평가 -> 주어진 page reference string에 대해 page fault를 얼마나 내는지 조사
  - page reference string: 페이지를 접근한 순서

## Page Replacement 순서

1. sap out victim page
2. victim page valid-invalid bit을 invalid 로 바꿈
3. swap demand page in
4. reset page table for new page to valid

## Optimal Algorithm -> page fault가 가장 적은 알고리즘

page reference string을 미리 알고있다는 가정 하에 이 알고리즘 사용

- 가장 먼 미래에 참조되는 page를 replace
- 미래의 참조를 어떻게 아는지 -> 실제 시스템에서 사용되는 것은 불가능
- 다른 알고리즘의 성능에 대한 upper bound 제공(다른 알고리즘의 성능 참고용으로 사용)

## FIFO Algorithm

- 먼저 들어온 것 먼저 내쫓음
- 메모리 크기를 늘려줘도 성능이 더 나빠지는 상황 발생 가능함

## LRU(Least Recently Used) Algorithm(실제로 가장 많이 사용되는 알고리즘)

- 가장 오래전에 참조된 것을 지움

## LFU(Least Frequently Used) Algorithm

- 참조 횟수가 가장 적은 페이지를 지움
- 최저 참조 횟수인 page가 여럿 있는 경우
  - LFU 알고리즘 자체에서는 여러 page 중 임의로 선정
  - 성능 향상 위해 가장 오래전에 참조된 page 지우게 구현할 수 있다

## LRU와 LFU 알고리즘의 구현

### LRU

더블 링크드 리스트로 구현해서 가장 최근에 참조된 것은 아래쪽으로 보내는 식으로 구현
replacement 시에는 가장 위에 있는것을 삭제하면 된다.
=> 시간 복잡도 O(1): 비교할 필요없이 가장 첫번째 것 삭제하면 되므로

### LFU

더블 링크드 리스트로 가장 참조 횟수 적은 page는 위로 참조 횟수 많은 것은 아래로 보내는 식으로 구현

어떤 page가 참조되면 참조 횟수가 1 늘어난 것이므로 다른 page 참조 횟수들과 비교를 하면서 내려가야한다.

시간 복잡도 O(n) 발생 가능

그래서 heap을 사용하여 구현 => O(logn)으로 만들수 있음

## Page System

- page fault인 경우에만 OS가 관여
- 페이지가 이미 메모리에 존재하는 경우 참조시각 등의 정보를 OS가 알 수 없음
- O(1)인 LRU의 list 조작조차 불가능

## Clock Algorithm

page system에선 LFU, LRU 같은 알고리즘 사용 불가하므로
clock algorithm 사용

- LRU의 근사 알고리즘
- second chance algorithm or NUR(Not Used Recently) or NRU(Not Recently Used)이라 불림

1. page table의 reference bit가 0인 것을 찾을 때까지 포인터를 하나씩 앞으로 이동
2. 포인터 이동 중 reference bit 1은 모두 0으로 바꿈
3. Reference bit이 0인 것 찾으면 그 페이지 교체

- 한 바퀴 되돌아와서도(=second chance) 0이면 그때에는 replace 당함
- 자주 사용되는 페이지라면 second chance가 올 때 1일 것이다.

### Clock algorithm의 개선

- reference bit과 modified bit을 함께 사용
- reference bit = 1 최근에 참조된 페이지
- modified bit = 1 -> 쓰기 작업이 이뤄졌으므로 page 내쫓을때 디스크에 변경사항 반영하고 내쫓아야 한다.

modified bit과 reference bit이 0 인 page를 내쫓으면 더 성능향상이 있다.

## Page Frame의 Allocation

각 프로세스에 얼마만큼의 page frame을 할당할 것인지

- Allocation의 필요성

  - 메모리 참조 명령어 수행시 명령어, 데이터 등 여러 페이지 동시 참조
  - loop 구성하는 page들은 한꺼번에 allocate 되는 것이 유리함

- Allocation scheme
  1. Equal allocation: 모든 프로세스에 똑같은 갯수 할당
  2. proportional allocation: 프로세스 크기에 비례하여 할당
  3. Priority allocation: 프로세스의 priority에 따라 다르게 할당

## Thrashing

- 프로세스의 원활한 수행에 필요한 최소한의 page frame 수를 할당 받지 못한 경우 발생
- page fault rate이 매우 높아짐
- CPU utilization 이 낮아짐
- OS는 MPD(Multiprogramming degree)를 높여야 한다고 판단
- 또 다른 프로세스가 시스템에 추가됨 (higher MPD)
- 프로세스는 page의 swap in/swap out으로 매우 바쁨
- 대부분읭 시간에 CPU는 한가함
- low throughput

## Working-Set model

### Locality of reference(참조 지역성)

- 프로세스는 특정 시간 동안 일정 장소만을 집중적으로 참조
- 집중적으로 참조되는 해당 page들의 집합을 locality set이라 함

### Working-set model

- locality에 기반하여 프로세스가 일정 시간 동안 원활하게 수행되기 위해 한꺼번에 메모리에 올라와 있어야 하는 page들의 집합을 Working set이라 정의
- Working Set 모델에서는 process의 working set 전체가 메모리에 올라와 있어야 수행되고 그렇지 않을 경우 모든 frame을 반납한 후 swap out 한다.
- Thrashing 방지
- Multiprogramming degree 결정함
