## equals를 재정의하지 않는게 좋은 상황
- 각 인스턴스가 본질적으로 고유하다
	값을 표현하는게 아닌 동작하는 개체를 표현하는 클래스
	ex) Thread
- 인스턴스의 논리적 동치성을 검사할 일이 없다.
- 상위 클래스에서 재정의한 equals가 하위 클래스에서도 딱 들어맞는 경우
- 클래스가 private이거나 package-private이고 equals 메서드를 호출할 일이 없다.
- 값 클래스라 해도 같은 인스턴스가 둘 이상 만들어지지 않는 것이 보장될 때
	- ex) 싱글턴 or enum => 논리적 동치성과 객체 식별성이 사실상 같은 의미이다.
## equals를 재정의해야 하는 경우
- 논리적 동치성 비교하도록 해야하는 경우
## equals 메서드 재정의 시 지켜야 하는 규약
- 반사성: null 아닌 참조 값 x에 대해, x.equals(x)는 true다.
- 대칭성: null 아닌 모든 참조 값 x, y에 대해, x.equals(y)가 true면 y.equals(x)도 true다.
- 추이성: null 아닌 모든 참조 값 x,y,z에 대해 x.equals(y) true => y.equals(z) true => x.equals(z) true 다.
- 일관성 null 아닌 모든 참조 값 x,y에 대해 x.equals(y)를 반복 호출하면 항상 같은 값을 반환한다.
- null 아닌 모든 참조 값 x에 대해 x.equals(null)은 false다

#effective-java 