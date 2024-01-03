immutable 객체 사용 시 장점
1. 한 번 정의된 상태가 유지되므로, 코드를 이해하기 쉽다.
2. immutable 객체는 공유 시 충돌이 이뤄지지 않으므로, 병렬 처리를 안전하게 할 수 있다.
3. immutable 객체에 대한 참조는 변경되지 않으므로, 쉽게 캐시할 수 있다.
4. immutable 객체는 방어적 복사본을 만들 필요가 없다. 또한 객체 복사 시 깊은 복사 하지 않아도 된다.
5. immutable 객체는 다른 객체를 만들 때 활용하기 좋다.
6. immutable 객체는 set 또는 map의 키로 사용할 수 있다.
	- [[mutable 객체는 set 또는 map의 키로 사용할 수 없다.]]

> immutable 객체는 변경할 수 없다는 단점이 있으므로 자신의 일부를 수정하여 새로운 객체를 만들어 내는 메서드를 가져야 한다.

> [!example] 
> immutable인 Int는 내부적으로 plus와 minus 메서드로 자신을 수정한 새로운 Int를 리턴할 수 있다.
> Iterable도 읽기 전용이다. map 과 filter 메서드를 통해 자신을 수정한 새로운 Iterable 객체를 만들어 리턴한다.

[[data 한정자]]

effective kotlin - 13.p

#effective 