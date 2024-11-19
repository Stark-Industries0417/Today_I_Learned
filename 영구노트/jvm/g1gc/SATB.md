> [!info] 
> G1GC는 STAB 알고리즘을 사용하여 mark 작업 실시
> SATB는 STW가 일어난 직후의 객체에 대해서만 mark 작업 실시
> 그러므로 mark 도중 죽은 객체도 라이브 객체로 간주한다.


#G1GC 