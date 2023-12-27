###  2023-12-27 17:50
### 주제
----
### 메모
맨 앞의 다섯 원소에 대한 componentN 을 제공한다!
``` kotlin
val x = listOf(1, 2) 
val (a, b, c, d, e) = x >> 인덱스 에러

val (a, b, c, d, e, f) = x 
>> 여섯 개 이상의 변수 사용하는 구조 분해 요구 시엔
>> component6에 의한 컴파일 오류가 발생한다.
```
### 출처
kotlin in action 328.p
### 연결문서
[[구조 분해 선언과 루프]]
#kotlin
