
> [!info] RSet 은 카드 테이블(Heap을 특정 512Byte 로 나눈 자료구조)의 인덱스를 가지고 있다.
> 카드 테이블은 특정 카드에 속하는 참조가 변경되면 dirty로 표시된다.
> 이를 바탕으로 GC는 RSet 의 자료구조에서 특정 region의 카드 인덱스를 통해 해당되는 카드 영역만 탐색하여 살아있는 객체를 식별할 수 있다.

- 객체의 살았는지 죽었는지를 나타내는 메타 데이터 영역
- Old 영역에서 young 영역으로의 포인터를 추적한다.
- 객체가 어떤 region에 저장되어 있는지 기록
- Total Heap 메모리의 5% 미만의 크기를 가짐
- [[write barrier 메커니즘]] 사용



#G1GC 