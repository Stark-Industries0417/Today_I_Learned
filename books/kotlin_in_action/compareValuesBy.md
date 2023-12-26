###  2023-12-26 16:10
### 주제
----
### 메모
```kotlin
override fun compareTo(other: Person): Int {
return compareValuesBy(this, other,
	  Person::lastName, Person::firstName)
}
```
첫 번째 비교 함수(lastName)에 두 객체를 넘겨 같지 않단 결과(0 아닌 값) 나오면 그 결과 값 즉시 반환하고 두 객체가 같으면 두 번째 비교 함수를 통해 두 객체를 비교한다.
인자로 받은 모든 함수가 0을 반환하면 0 반환한다.
### 출처
kotlin in action - 318.p
### 연결문서
#kotlin
