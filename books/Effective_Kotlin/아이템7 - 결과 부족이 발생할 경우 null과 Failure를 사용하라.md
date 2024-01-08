## 함수가 원하는 결과를 만들어 낼 수 없는 경우 예시
- 서버로부터 데이터 읽으려 했는데 인터넷 연결 문제로 읽지 못한 경우
- 조건에 맞는 첫 요소를 찾으려 했는데, 조건에 맞는 요소가 없는 경우
- 텍스트를 파싱해서 객체를 만들려 했는데, 텍스트 형식이 맞지 않는 경우
> [!tip] 위 예시 처리 매커니즘
> - null 또는 실패를 나타내는 sealed 클래스 리턴
> - 예외를 throw

> [!info] 예외를 throw 경우
> - 예외는 정보 전달하는 방법으로 사용해선 안된다.
> - 예외는 잘못된 특별한 상황을 나타내야 하고, 처리되어야 한다.
> - 예외는 예외적인 상황이 발생했을 때 사용하는 것이 좋다.

> [!info] null과 Failure는 예상되는 오류를 표현할 때 굉장히 좋다.
> 예측하기 어려운 예외적인 범위의 오류는 예외를 throw해서 처리하는것이 좋다.
``` kotlin
val age = userText.readObjectOrNull<Person>()?.age ?: -1

val person = userText.readObjectOrNull<Person>()
val age= when(person) {
	is Success -> person.age
	is Failure -> -1
}
```
- try-catch 블록보다 효율적, 사용하기 쉽고 더 명확하다.
- 예외 처리는 놓칠 수 있지만 null 값과 sealed result 클래스는 명시적으로 처리해야 하며, 어플리케이션의 흐름을 중지하지 않는다.
## null 값과 sealed result 클래스의 차이점
- 추가적인 정보 전달해야 한다면 sealed result 사용 아니면 null 사용
> [!tip] nullable을 리턴하지 말라
> - 개발자는 항상 요소를 안전하게 추출할 거라 생각하기 때문이다.
> - 개발자에게 null이 발생할 수 있단 경고를 주려면 getOrNull 등을 사용해서 무엇이 리턴되는지 예측할 수 있게 하는것이 좋다.

#effective 