###  2023-12-27 17:16
### 주제 
----
### 메모
- rangeTo 연산자는 다른 산술 연산자보다 우선순위가 낮다
- 혼동 피하기 위해 괄호로 인자 감싸주면 좋다
``` kotlin
operator fun <T: Comparable<T>> T.rangeTo(that: T): ClosedRange<T>

val n = 9
println(0..(n+1))

0..n.forEach { }

>> 범위의 메서드를 호출하려면 범위를 괄호로 둘러싸야 한다.
>> (0..n).forEach { }
```
### 출처
kotlin in action 리스트 7.12 - 324.p
### 연결문서
[[날짜 범위에 대한 이터레이터 구현]]
#kotlin