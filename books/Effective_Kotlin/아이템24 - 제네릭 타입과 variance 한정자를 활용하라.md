> [!info] 코틀린 **함수 타입**의 파라미터 타입은 반공변이고 리턴 타입은 공변 이다.
> (in T, in T) -> out T

``` kotlin
fun printProcessNumber(transition: (Number) -> Any) {  
    print(transition(42))  
}  
  
fun main() {  
    val IntToDouble: (Int) -> Double = { it.toDouble() }  
    val numberHash: (Any) -> Number = { it.hashCode() }  
  
    printProcessNumber(IntToDouble) // 컴파일 에러
    printProcessNumber(numberHash)  
}
```

``` kotlin
open class Dog  
  
class Puppy: Dog()  
class Hound: Dog()  
  
class Box<out T> {  
    private var value: T? = null  

	out T 는 생산자 인데 매개변수에 위치 하는 것은 데이터를 소비하게 되는 것이므로
	매개변수 자리에 들어갈 수 없다.
    fun set(value: T) {  
        this.value = value  
    }  
}  

val puppyBox = Box<Puppy>()  
val dogBox: Box<Dog> = puppyBox  
  
fun main() {  
    dogBox.set(Hound()) // Puppy를 위한 공간이다.  
}

- 공변 타입이 반공변 타입인 파라미터에 존재하게되면 puppy 자리에 Dog의 자식인 Hound가 올 수 잇게 된다.

그래서 public 반공변 위치에 공변 타입 파라미터가 오는 것을 금지한다.
```

> [!info] out 위치는 암묵적인 업캐스팅을 허용한다.

``` kotlin
MutableList<in T>를 사용할 경우 get과 set을 모두 사용할 수 있다.
get의 경우 전달되는 자료형은 Any?가 된다.
모든 타입의 슈퍼타입을 가진 리스트(Any 리스트)가 존재할 가능성이 있기 때문이다.

=================================

fun append(list: MutableList<Any>) {
	list.add(42)
}

val strs = mutableListOf<String>("A", "B", "C")
append(strs) // 코틀린에선 사용할 수 없는 코드

MutableList<out T> 였다면 위 코드가 가능해져 strs에 숫자가 들어 갈 수 있게 된다.
```
공변(out 한정자)는 노출되는 타입에만 사용해야 한다.

#effective 