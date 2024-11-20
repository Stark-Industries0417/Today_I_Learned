> [!info] 
> Young only GC는 Eden 영역이 가득 차면 트리거가 된다.
> Young 영역의 살아있는 객체 식별 한다
> 살아있는 객체를 Survivor(from-Survivor, to-Survivor)영역이나 old 영역으로 복사한다.
> 복사 후 빈 영역을 회수한다.
> RSet을 업데이트 한다.

# Space-Reclamation
Old 영역의 점유율이 임계값을 넘으면 [[Concurrent Cycle]] 실행한다.
- young region and old region 의 live 객체도 비우는 여러번의 Mixed-GC로 구성되어 있다.
- 공간 재 확보 단계는 G1이 더이상 Old Region을 효율적으로 줄일 수 없겠다고 판단되면 종료된다.

#G1GC 