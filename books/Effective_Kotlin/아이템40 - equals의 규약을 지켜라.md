> [!info] equals 메서드는 다른 타입의 두 객체를 비교하는 것은 허용되지 않는다.
> 둘이 상속 관계를 갖는 경우엔 비교할 수 있다.

``` kotlin
data class DateTime(
	private var millis: Long = 0L,
	private var timeZone: TimeZone? = null
) {
	private var asStringCache = ""
	private var changed = false
	//...
}
data 클래스는 기본 생성자에 포함된 프로퍼티로만 equals를 만든다.
기본 생성자에 선언되지 않은 프로퍼티는 copy로 복사되지 않는다.
```
### equals를 직접 구현해야 하는 경우
- 기본적으로 제공되는 동작과 다른 동작을 해야하는 경우
- 일부 프로퍼티만으로 비교해야 하는 경우
- data 한정자를 붙이는 것을 원하지 않거나, 비교해야 하는 프로퍼티가 기본 생성자에 없는 경우

#effective 