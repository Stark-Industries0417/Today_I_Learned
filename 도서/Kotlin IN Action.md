## 목차

[1장 코틀린이란 무엇이며, 왜 필요한가?](#1장-코틀린이란-무엇이며-왜-필요한가)
- [코틀린 맛보기](#코틀린-맛보기)
- [정적 타입 지정 언어](#정적-타입-지정-언어)
- [코틀린 응용](#코틀린-응용)

[2장 코틀린 기초](#2장-코틀린-기초)
- [문(statement)과 식(expression)의 구분](#문statement과-식expression의-구분)
- [변수](#변수)
- [변경 가능한 변수와 변경 불가능한 변수](#변경-가능한-변수와-변경-불가능한-변수)
- [문자열 템플릿](#문자열-템플릿)
- [클래스와 프로퍼티](#클래스와-프로퍼티)
- [프로퍼티](#프로퍼티)
- [커스텀 접근자](#커스텀-접근자)
- [선택 표현과 처리: enum과 when](#선택-표현과-처리-enum과-when)
- [when 분기 안에 여러 값 사용하기](#when-분기-안에-여러-값-사용하기)
- [when 분기 조건에 여러 다른 객체 사용하기](#when-분기-조건에-여러-다른-객체-사용하기)
- [인자 없는 when 사용](#인자-없는-when-사용)
- [스마트 캐스트: 타입 검사와 타입 캐스트를 조합](#스마트-캐스트-타입-검사와-타입-캐스트를-조합)
- [리팩토링: if를 when으로 변경](#리팩토링-if를-when으로-변경)
- [수에 대한 이터레이션: 범위와 수열](#수에-대한-이터레이션-범위와-수열)
- [코틀린의 예외 처리](#코틀린의-예외-처리)
- [try, catch, finally](#try-catch-finally)

# 1장 코틀린이란 무엇이며, 왜 필요한가?

### 코틀린 맛보기

``` kotlin
data class Person(val name: String,
                    val age: Int? = null)

fun main(args: Array<String>) {
    val persons = listOf(Person("영희"), 
                            Person("철수", age = 29))
    
    val oldest = persons.maxBy { it.age ?: 0 }
    println("나이가 가장 많은 사람: $oldest")
}

name과 age라는 프로퍼티가 들어간 간단한 데이터 클래스 정의
age 프로퍼티의 디폴트 값은(따로 지정하지 않은 경우) null 이다.

maxBy 함수에 전달한 람다 식은 파라미터를 하나 받는다.
it라는 이름 사용하면 별도로 파라미터 이름 정의하지 않아도 된다.

?:(엘비스 연산자)는 age가 null인 경우 0 반환하고 그렇지 않은 경우 age 값 반환한다.
```

[돌아가기](#목차)

### 정적 타입 지정 언어
> 모든 프로그램 구성 요소의 타입을 컴파일 시점에 알 수 있고 프로그램 안에서 객체의 필드나 메서드를 사용할 때마다 컴파일러가 타입을 검증해준다는 뜻

#### 정적 타입 지정의 장점
- 성능: 실행 시점에 어떤 메서드를 호출할지 알아내는 과정이 없으므로 메서드 호출이 더 빠르다.
- 신뢰성: 컴파일러가 프로그램의 정확성을 검증하기 때문에 실행 시 프로그램이 오류로 중단될 가능성이 더 적어진다.
- 유지보수성: 코드에서 다루는 객체가 어떤 타입에 속하는지 알 수 있기 때문에 처음 보는 코드를 다룰 때도 더 쉽다.
- 도구지원: 더 안전하게 리팩토링 할 수 있고, 도구는 더 정확한 코드 완성 기능을 제공할 수 있으며, IDE의 다른 지원 기능도 더 잘 만들 수 있다.

#### 함수형 프로그래밍과 객체지향 프로그래밍
- 일급 시민인 함수: 함수를 일반 값처럼 다룰 수 있다. 함수를 변수에 저장할 수 있고, 함수를 인자로 다른 함수에 전달 할 수 있으며, 함수에서 새로운 함수를 만들어서 반환할 수 있다.
- 불변성: 함수형 프로그래밍에서는 일단 만들고 나면 내부 상태가 절대 바뀌지 않는 불변 객체를 사용해 프로그램을 작성한다.
- 부수효과 없음: 입력이 같으면 같은 출력을 보장, 다른 객체의 상태 변경 하지 않음, 함수 외부나 다른 바깥 환경과 상호작용 하지 않는 순수 함수를 사용

[돌아가기](#목차)


### 코틀린 응용 

#### 코틀린 서버 프로그래밍

- 브라우저에 HTML 페이지를 돌려주는 웹 애플리케이션
- 모바일 애플리케이션에게 HTTP 통해 JSON API를 제공하는 백엔드 애플리케이션
- RPC(원격 프로시저 호출) 프로토콜을 통해 서로 통신하는 작은 서비스들로 이뤄진 마이크로서비스

[돌아가기](#목차)

# 2장 코틀린 기초

### 문(statement)과 식(expression)의 구분

> 식은 값을 만들어 내며 다른 식의 하위 요소로 계산에 참여할 수 있다.   
문은 자신을 둘러싸고 있는 가장 안쪽 블록의 최상위 요소로 존재하며 아무런 값을 만들어 내지 않는다.   
자바에선 모든 제어 구조가 문인 반면에 코틀린에서는 루프를 제외한 대부분의 제어 구조가 식이다.

**대입문은 자바에선 식 이었으나 코틀린에선 문이 되었다.**


``` kotlin
fun max(a: Int, b: Int): Int {
    return if (a > b) a else b
}


fun max(a: Int, b: Int): Int = if (a > b) a else b

본문이 중괄호로 둘러싸인 함수를 블록이 본문인 함수라 부름
등호와 식으로 이뤄진 함수를 식이 본문인 함수라 부름

식이 본문인 함수의 경우 굳이 반환 타입을 적지 않아도 컴파일러가 함수 본문 식을 분석해서 식의 결과 타입을 함수 반환 타입으로 정해준다.
=> 이를 타입 추론이라 한다.

블록이 본문인 함수가 값 반환한다면 꼭 반환 타입을 지정해야 한다.
```

[돌아가기](#목차)


### 변수

**식이 본문인 함수와 마찬가지로 타입 지정하지 않으면 컴파일러가 초기화 식 분석해서 초기화 식의 타입을 변수 타입으로 지정한다.**

``` kotlin
val answer: Int
answer = 42 

=> 초기화 식이 없다면 변수에 저장될 값에 대해 아무 정보가 없기 때문에 타입 추론을 할 수 없다. 따라서 타입 반드시 지정해야 한다.
```

[돌아가기](#목차)

### 변경 가능한 변수와 변경 불가능한 변수

- val(값 뜻하는 value에서 따옴): 변경 불가능한 참조를 저장하는 변수, 일단 초기화 하면 재대입 불가능   
    자바로 치면 final 변수에 해당.

- var(변수를 뜻하는 variable에서 따옴): 변경 가능한 참조. 자바의 일반 변수에 해당

> 기본적으로 모든 변수는 val 키워드를 사용해 불변 변수로 선언하고, 나중에 필요할 때에만 var로 변경하라

``` kotlin
어떤 블록이 실행도딜 때 오직 한 초기화 문장만 실행됨을 컴파일러가 확인할 수 있다면 조건에 따라 val 값을 다른 여러 값으로 초기화 할 수 있다.

val message: String
if(canPerformOperation()) {
    message = "Success"
} else {
    message = "Failed"
}

참조 자체는 불변일지라도 그 참조가 가리키는 객체의 내부 값은 변경될 수 있다.

val languages = arrayListOf("Java")
languages.add("Kotlin")
```

``` kotlin
var 키워드를 사용하면 값을 변경할 수 있지만 변수 타입은 고정돼 바뀌지 않는다.

var answer = 42
answer = "no answer"
```

[돌아가기](#목차)

### 문자열 템플릿

``` kotlin
val name = if (args.size > 0) args[0] else "Kotlin"
println("Hello, $name!")
```

**복잡한 식도 중괄호({})로 둘러싸서 문자열 템플릿 안에 넣을 수 있다.**

> $name님 반가와요! 같은 경우 '님'도 변수로 착각 하여 에러를 일으킨다 그래서 중괄호로 변수명을 감싸는 습관을 들여야 한다.      
\${name}

[돌아가기](#목차)

### 클래스와 프로퍼티

``` kotlin
class Person(val name: String) 

=> public 가시성 변경자 사라짐, 기본 가시성은 public 이므로 견경자 생략해도 된다.
```

[돌아가기](#목차)

### 프로퍼티

```kotlin
class Person {
    val name: String <- 읽기 전용 프로퍼티, 코틀린은 비공개 필드와 필드를 읽는 단순한 게터를 만들어 낸다.
    var isMarried: Boolean <- 쓸 수 있는 프로퍼티로, 코틀린은 비공개 필드, 공개 게터, 공개 세터를 만들어낸다.
}
```

- 이름이 is로 시작하는 프로퍼티의 게터에는 get이 붙지 않고 원래 이름 사용
- 세터에는 is를 set으로 바꾼 이름을 사용

``` kotlin
val person = Person("Bob", true) <- new 키워드 사용하지 않고 생성자 호출한다.

person.name
person.isMarried
=> 프로퍼티 이름을 직접 사용해도 코틀린이 자동으로 게터를 호출해준다.
```

[돌아가기](#목차)

### 커스텀 접근자

``` kotlin
class Rectangle(val height: Int, val width: Int) {
    val isSquare: Boolean
    get() { <- 프로퍼티 게터 선언
        return height == width
    }
}
```

[돌아가기](#목차)

### 선택 표현과 처리: enum과 when
> when 은 자바의 switch를 대치한다.

``` kotlin
enum class Color {
    RED, ORANGE, YELLOW ...
}
```

``` kotlin
enum class Color(val r: Int, val g: Int, val b: Int) {
    RED(255,0, 0), ORANGE(255, 165, 0), YELLOW(255, 255, 0),
    BLUE(0, 0, 255);

    fun rgb() = (r * 256 + g) * 256 + b
}

fun main() = println(Color.BLUE.rgb())
>>> 255

enum 클래스 안에 메서드를 정의하는 경우 반드시 enum 상수 목록과 메서드 정의 사이에 세미콜론 넣어야 한다.
```


``` kotlin
enum class Color(val r: Int, val g: Int, val b: Int) {
    RED(255,0, 0), ORANGE(255, 165, 0), YELLOW(255, 255, 0),
    BLUE(0, 0, 255);

    fun rgb() = (r * 256 + g) * 256 + b
}

fun getMnemonic(color: Color) =
    when (color) {
        Color.RED -> "Richard"
        Color.ORANGE -> "Of"
        Color.YELLOW -> "York"
        Color.BLUE -> "Battle"
    }

fun main() = println(getMnemonic(Color.BLUE))

자바와 달리 각 분기의 끝에 break 넣지 않아도 됨
성공적으로 매치되는 분기 찾으면 switch는 그 분기 실행
```

[돌아가기](#목차)

### when 분기 안에 여러 값 사용하기

``` kotlin
enum class Color(val r: Int, val g: Int, val b: Int) {
    RED(255,0, 0), ORANGE(255, 165, 0), YELLOW(255, 255, 0),
    BLUE(0, 0, 255);

    fun rgb() = (r * 256 + g) * 256 + b
}
,
fun getWarmth(color: Color) =
    when(color) {
        Color.RED, Color.ORANGE -> "warm"
        Color.YELLOW -> "aaa"
        Color.BLUE -> "awefaewf"
    }

fun main() = println(getWarmth(Color.BLUE))
```

[돌아가기](#목차)

### when 분기 조건에 여러 다른 객체 사용하기

``` kotlin
enum class Color(val r: Int, val g: Int, val b: Int) {
    RED(255,0, 0), ORANGE(255, 165, 0), YELLOW(255, 255, 0),
    BLUE(0, 0, 255);

    fun rgb() = (r * 256 + g) * 256 + b
}

fun mix(c1: Color, c2: Color): Color {
    return when(setOf(c1, c2)) {
        setOf(RED, YELLOW) -> ORANGE
        setOf(BLUE, YELLOW) -> BLUE
        else -> throw Exception("Dirty color")
    }
}

fun mix(c1: Color, c2: Color) = 
    when(setOf(c1, c2)) {
        setOf(RED, YELLOW) -> ORANGE
    }

fun main() {
    println(mix(RED, YELLOW))
}

setOf -> 순서가 없는 set 객체
setOf(c1, c2) 와 setOf(RED, YELLOW)가 같다는 말은 c1이 RED이고 c2가 YELLOW 이거나 c1이 YELLOW이고 c2가 RED라는 말이다.
```

**setOf(c1, c2)와 분기 조건에 있는 객체 사이를 매치할 때 동등성을 사용한다**

[돌아가기](#목차)

### 인자 없는 when 사용

``` kotlin
enum class Color(val r: Int, val g: Int, val b: Int) {
    RED(255,0, 0), ORANGE(255, 165, 0), YELLOW(255, 255, 0),
    BLUE(0, 0, 255);

    fun rgb() = (r * 256 + g) * 256 + b
}

fun mixOptimized(c1: Color, c2: Color) =
    when {
        (c1 == RED && c2 == YELLOW) ||
                (c1 == YELLOW && c2 == RED) -> ORANGE
        else -> throw Exception("Dirty color")
    }

fun main() = println(mixOptimized(RED, YELLOW))

when에 아무 인자도 없으려면 각 분기의 조건이 불리언 결과를 계산하는 식이어야 한다.
```

[돌아가기](#목차)

### 스마트 캐스트: 타입 검사와 타입 캐스트를 조합

``` kotlin
interface Expr
class Num(val value: Int): Expr <- value라는 프로퍼티만 존재하는 단순 클래스로 Expr 인터페이스를 구현한다.
class Sum(val left: Expr, val right: Expr): Expr <- Expr 타입의 객체라면 어떤 것이나 Sum 연산의 인자가 될 수 있다. 따라서 Num이나 다른 Sum이 인자로 올 수 있다.

fun eval(e: Expr): Int {
    if(e is Num) {
        val n = e as Num
        return n.value
    }
    if(e is Sum) {
        return eval(e.right) + eval(e.left) <- 변수 e에 대해 스마트 캐스트를 사용한다.
    }
    throw IllegalArgumentException("Unknown expression")
}

fun main() = println(eval(Sum(Sum(Num(1), Num(2)), Num(4))))

코틀린에선 프로그래머 대신 컴파일러가 캐스팅을 해준다.
```

> 스마트 캐스트란?   
어떤 변수가 원하는 타입인지 is로 검사하고 나면 굳이 변수를 원하는 타입으로 캐스팅하지 않아도 마치 처음부터 원하는 타입으로 선언된 것처럼 사용할 수 있도록 컴파일러가 캐스팅 수행 해주는 것을 말한다.

**eval 함수에서 e의 타입이 Num인지 검사한 다음 부분에서 컴파일러는 e의 타입을 Num으로 해석한다.**

> 스마트 캐스트를 사용한다면 그 프로퍼티는 반드시 val이어야 하며 커스텀 접근자를 사용한 것이어도 안 된다.

[돌아가기](#목차)


### 리팩토링: if를 when으로 변경

코틀린에서는 if가 값을 만들어 내는 식이기 때문에 자바와 달리 3항 연산자가 따로 없다.

return 없애는것으로 리팩토링
``` kotlin
fun eval(e: Expr): Int =
    if(e is Num) {
        e.value
    } else if (e is Sum) {
        eval(e.right) + eval(e.left)
    } else {
        throw IllegalArgumentException("Unknown expression")
    }
fun main() = println(eval2(Sum(Sum(Num(1), Num(2)), Num(4))))
```

**if의 분기에 식이 하나밖에 없다면 중괄호를 생략해도 된다. if분기에 블록 사용하는 경우 그 블록의 마지막 식이 그 분기의 결과 값이다.**

``` kotlin
fun eval(e: Expr): Int =
    if(e is Num) e.value
    else if (e is Sum) eval(e.right) + eval(e.left)
    else throw IllegalArgumentException("Unknown expression")

fun main() = println(eval2(Sum(Sum(Num(1), Num(2)), Num(4))))
```

#### if 중첩 대신 when 사용하기

``` kotlin
fun eval4(e: Expr): Int =
    when(e) {
        is Num -> e.value
        is Sum -> eval(e.right) + eval(e.left)
        else -> throw IllegalArgumentException("Unknown expression")
    }

fun main() = println(eval2(Sum(Sum(Num(1), Num(2)), Num(4))))
```

#### 블록의 마지막 if나 when 모두 분기에 블록을 사용한다면 마지막 문장이 블록 전체의 결과가 된다.

> 식이 본문인 함수는 블록을 본문으로 가질 수 없고 블록이 본문인 함수는 내부에 return 문이 반드시 있어야 한다.

[돌아가기](#목차)

### 수에 대한 이터레이션: 범위와 수열

1..100 -> 1과 100 모두 포함한다.
``` kotlin
fun fizzBuzz(i: Int) = when {
    i % 15 == 0 -> "FizzBuzz"
    i % 3 == 0 -> "Fizz"
    i % 5 == 0 -> "Buzz"
    else -> "${i}"
}

fun main() {
    for(i in 1..100) {
        print(fizzBuzz(i))
    }
}
```
``` kotlin
fun main() {
    for(i in 100 downTo 1 step 2) {
        println(i)
    }
}
100부터 1까지 2칸씩 수를 보여준다
```

``` kotlin
fun main() {
    for(i in 0 until 5) {
        println(i)
    }
}

0부터 4까지 
```

``` kotlin
fun main() {
    val list = arrayListOf(10, 11, 1001)
    for((idx, elem) in list.withIndex()) {
        println("$idx, $elem")
    }
}
```

[돌아가기](#목차)

### 코틀린의 예외 처리

**자바와 달리 코틀린의 throw는 식이다.**

``` kotlin

val percentage = 
    if(number in 0..100)
        number
    else
        throw IllegalArgumentException(
            "A percentage value must be between 0 and 100: $number"
        )

if 조건이 참이면 percentage 변수가 number의 값으로 초기화된다.
하지만 조건이 거짓이라면 초기화되지 않는다.
```

[돌아가기](#목차)

### try, catch, finally

자바와 마찬가지로 try 사용하기

``` kotlin
fun readNumber(reader: BufferedReader): Int? <- 함수가 던질 수 있는 예외를 명시할 필요가 없다.
{
    try {
        val line = reader.readLine()
        return Integer.parseInt(line)
    } catch(e: NumberFormatException) {
        return null
    }
    finally {
        reader.close()
    }
}
```

#### try를 식으로 사용하기

``` kotlin
fun readNumber(reader: BufferedReader) {
    val number = try {
        Integer.parseInt(reader.readLine()) <- 이 식의 값이 try 식의 값이 된다.
    } catch(e: NumberFormatException) {
        return
    }
    println(number)
}
```

**try의 본문도 내부에 여러 문장이 있으면 마지막 식의 값이 전체 결과 값이다.**


[돌아가기](#목차)


# 3장 함수 정의와 호출

### 함수를 호출하기 쉽게 만들기

``` kotlin
fun main() {
    val list = listOf(1, 2, 3)
    println(joinToString(list, "; ", "(", ")"))
}  

fun <T> joinToString(
    collection: Collection<T>,
    separator: String,
    prefix: String,
    postfix: String
): String {
    val result = StringBuilder(prefix)

    for((idx, elem) in collection.withIndex()) {
        if(idx > 0) result.append(separator)
        result.append(elem)
    }
    result.append(postfix)
    return result.toString()
}

디폴트 파라미터 지정

fun <T> joinToString(
    collection: Collection<T>,
    separator: String = ", ",
    prefix: String = "",
    postfix: String = ""
)

=> 함수 호출할 때 모든 인자를 쓸 수도 있고, 일부 생략할 수도 있다.

joinToString(list, ", ", "", "")
joinToString(list)
joinToString(list, "; )

이름 붙인 인자를 사용하는 경우, 인자 목록의 중간에 있는 인자를 생략하고 지정하고 싶은 인자를 이름 붙여서 순서와 관계없이 지정할 수 있다.
ex) joinToString(list, postfix=";", prefix="# ")
```

[돌아가기](#목차)



