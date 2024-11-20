## 1. [[Initial-mark]]

## 2. [[Concurrent-root-region-scan]]

## 3. [[Concurrent-mark]]

## 4. Remark
- Marking 마무리 단계
- STW 발생
- 사용된 [[SATB]] 버퍼 비움, Reference processing 동작
- 마킹 마무리 및 글로벌 참조 처리 및 클래스 언로드 수행
- Empty region free 리스트로 포함
- RSet 생존 객체 비율 업데이트
- SATB 버퍼를 비운다.
## 5. Cleanup
- Region 회수가 실제로 진행될지 결정
- **Space Reclamation** 단계가 온다면, Young only GC 단계는 1회의 Mixed-GC만 진행하고 완료된다.
- 살아있는 객체와 Free Region에 대해 계산 수행
- STW가 발생
- Empty Region을 재정리하고 이 영역을 Free List에 추가
## 6. Space-Reclamation
- Young 영역뿐만 아니라 Old 영역의 일부도 함께 수집 (Mixed 컬렉션)
- 더 이상 의미 있는 공간 회수가 어렵다고 판단되면 이 단계를 종료하고 다시 Young-Only 단계로 돌아간다.


#G1GC 