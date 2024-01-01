**copy 라는 이름의 메서드를 만들어준다.**

``` kotlin
class User(
	val name: String,
	val surname: String
) {
	fun withSurname(surname: String) = User(name, surname)
	fun withName(name: String) = User(name, surname)
}

var user = User("Maja", "Markiewicz")
user = user.withSurname("Moskaja")
print(user) // User(name=Maja, surname=Moskaja)

모든 프로퍼티를 대상으로 함수를 하나하나 만드는 것은 굉장히 귀찮기 때문에
data 한정자를 사용한다.

data class User(
	val name: String,
	val surname: String
)

var user = User("Maja", "Markiewicz")
user = user.copy(surname = "Moskaja")
pritn(user) // User(name=Maja, surname=Moskaja)
```

effective kotlin - 15.p

#effective 