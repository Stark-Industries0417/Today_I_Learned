> [!tip] immutable 컬렉션보다 mutable 컬렉션이 좋은 점은 성능적인 측면에서 더 빠르다.
### immutable 컬렉션에 요소를 추가
![[Pasted image 20240310172738.png | 600]]
- 복제 처리 하지 않는 mutable 컬렉션이 성능적 관점에서 좋다.
- 다만 가변성 제한 위해 지역 변수에선 mutable 컬렉션을 사용하는 것이 합리적이다.

#effective 