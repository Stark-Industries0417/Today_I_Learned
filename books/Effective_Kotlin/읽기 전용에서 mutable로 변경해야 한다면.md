###  2024-01-01 20:11
### 주제 list.toMutableList() 를 사용하라
----
### 메모
``` kotlin
val list = listOf(1, 2, 3)

val mutableList = list.toMutableList()
mutableList.add(4)
```

기존의 객체는 여전히 immutable이라 수정할 수 없으므로 안전하다.
### 출처
Effective Kotlin - 13.p
### 연결문서
#effective
