###  2024-01-10 13:35
### 주제
----
### 메모
``` kotlin
파라미터가 null이 될 수 있는 함수 파라미터 인 경우
다음과 같이 not null 체크를해서 실행할 수 있으며
fun foo(callback: (() -> Unit)?) {
	if (callback != null) {
		callback()
	}
	
	callback?.invoke() 이처럼 ? 와 invoke 를 사용해서도 가능하다.
}
```
### 출처
kotlin in action - 356.p
### 연결문서


#kotlin 