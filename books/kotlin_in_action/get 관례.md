###  2023-12-26 16:18
### 주제
----
### 메모
```kotlin
operator fun Point.get(index: Int): Int {
	return when(index) {
		0 -> x
		1 -> y
		else -> 
			throw IndexOutOfBoundsException("Invalid coordinate $index")
	}
}

val p = Point(10, 20)
println(p[1])
>> 20
```
### 출처
kotlin in action - 리스트 7.9 320.p
### 연결문서
#kotlin 
