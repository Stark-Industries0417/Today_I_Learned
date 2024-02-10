## componentN
객체의 프로퍼티의 위치 순서를 혼동해서 객체를 잘못해제하는 문제가 자주 발생하므로
기본 생성자의 프로퍼티 이름과 같은 이름을 사용하여 해제하는 것이 좋다.
이와 같이 했을 때 IDE에서 관련된 경고를 주기 때문이다.

``` kotlin
data class FullName(
	val firstName: String,
	val secondName: String,
	val lastName: String
)

val elon = FullName("Elon", "Reeve", "musk")
val (firstName, lastName) = elon >> IDE에서 경고 띄워줌

data class User(val name: String)

user.let { (a) -> print(a) }
>>> John
>>> user 를 받을 때 해제를 하면서 받을 수 있다.
```
## 튜플 대신 데이터 클래스 사용하기
- Pair, Triple 반환하는것 보다 명확한 이름을 가진 data class를 반환하는것이 좋다.
- 리턴 타입이 더 짧아지며, 전달하기 쉬워진다.
- 사용자가 데이터 클래스에 적혀있는 것과 다른 이름을 활용해 변수를 해제하면, 경고가 출력된다.

#effective 