
- Concurrent 동시에 진행하는것 이므로 STW가 발생하지 않는다.
- survivor 영역 스캔하여 old 영역의 레퍼런스를 찾아 mark
- 이 과정 도중 다음 Young GC가 발생할 수 있다.



#G1GC 