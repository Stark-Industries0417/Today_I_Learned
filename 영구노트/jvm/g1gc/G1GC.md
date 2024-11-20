[[STW를 해야하는 이유]]

> [!info] G1GC의 포인터 업데이트 과정
> 특정 객체를 새로운 리전으로 옮긴 경우
> GC는 리멤버드 셋을 통해 해당 리전을 참조하는 포인터들을 찾아
> 새 위치를 가릴키도록 업데이트 한다.
## Region 구성

### 1. Space - max heap size에 따라 1MB to 32MB의 크기를 가진다
- 영역의 개수가 2048개가 될 수 있도록 region의 크기가 결정된다.
### 2. Alive - 영역에 살아있는 객체들이 존재하는 영역 
### 3. Garbage - 수집될 쓰레기 객체들이 존재하는 영역
### 4. [[RSet ]]

### CSet - GC가 수행되는 동안 수집 될 수 있는 영역(young or old)
- GC가 수행될 region이 저장되어 있는 자료구조

## G1GC types
### [[Young only GC]]
> [!info] 
> young only GC 만으로 GC 작업이 부족하다고 판단하면 Young GC 단계에서 Concurrent Cycle 요청을 하게 된다.

### [[Concurrent Cycle]]



#G1GC
