> [!info] Comparable\<T> 인터페이스 구현하고 있거나 compareTo라는 연산자 메서드를 갖고 있다는 의미는 해당 객체가 어떤 순서를 갖고 있으므로 비교할 수 있다는 의미다.

``` kotlin
class User(val name: String, val surname: String)
surname으로 정렬하고, surname이 같은 경우엔 name까지 비교해서 정렬

val sorted = names.sortedWith(compareBy({ it.surname }, { it.name }))
```

#effective 