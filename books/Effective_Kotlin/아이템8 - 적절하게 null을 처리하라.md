> [!tip] null은 최대한 명확한 의미를 갖도록 해라
## null을 안전하게 처리하기
- ?., 스마트 캐스팅, Elvis 연산자 등을 활용해서 안전하게 처리
- 컬렉션 처리 중 없다는 것을 나타낼 때 빈 컬렉션을 사용하라
	- ```kotlin (Collection<T>?.orEmpty()) 확장 함수는 nullable이 아닌 List<T> 를 리턴받는다.```
> [!info] 방어적 프로그래밍과 공격적 프로그래밍
> 방어적 프로그래밍 : 코드가 프로덕션 환경으로 들어갔을 때 발생할 수 있는 수많은 것들로부터 프로그램 방어해서 안정성 높이는 방법을 나타내느 포괄적인 용어
> 모든 상황을 안전하게 처리하는 것은 불가능하기 때문에 이러한 경우에 **공격적 프로그래밍** 이란 방법을 사용한다.
>예상하지 못한 상황이 발생했을 때, 이러한 문제를 개발자에게 알려서 수정하게 만드는 것.
>아이템 5: 예외로 코드에 제한 걸기에서 require, check, assert가 바로 이러한 공격적 프로그래밍을 위한 도구이다.
## 오류 throw 하기
> [!tip] 다른 개발자가 어떤 코드를 보고 선입견 처럼 '당연히 그럴 것이다'라고 생각하게 되는 부분에 문제가 발생할 경우 throw, !!, requireNotNull, checkNotNull 등을 활용해 개발자에게 오류를 강제로 발생시켜 주는 것이 좋다.

## not-null assertion(!!)과 관련된 문제
> [!tip]
> !! 보단 lateinit 또는 Delegates.notNull()을 사용하라

- 빈 컬렉션 대신 null을 리턴하지 말라. ```List<Int>?와 Set<String?>```과 같은 컬렉션을 빈 컬렉션으로 둘 때와 null로 둘 때는 의미가 완전히 다르다. null은 컬렉션 자체가 없다는 것을 나타내며 요소가 부족하다는 것을 나타내려면, 빈 컬렉션을 사용하라
- nullable enum과 None enum 값은 완전히 다른 의미이다. null enum은 별도 처리해야 하지만, None enum은 정의에 없으므로 필요한 경우에 사용하는 쪽에서 추가해서 활용할 수 있단 의미
## nullable vs lateinit
- !! 연산자로 언팩하지 않아도 된다.
- 이후에 어떤 의미를 나타내기 위해 null을 사용하고 싶을 때, nullable로 만들 수 있다.
- 프로퍼티가 초기화된 이후엔 초기화되지 않은 상태로 돌아갈 수 없다.
> [!tip] lateinit은 프로퍼티를 처음 사용하기 전에 반드시 초기화될 거라고 예상되는 상황에 활용한다.


#effective 