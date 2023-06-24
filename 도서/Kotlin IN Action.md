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

[3장 함수 정의와 호출](#3장-함수-정의와-호출)
- [함수를 호출하기 쉽게 만들기](#함수를-호출하기-쉽게-만들기)
- [최상위 프로퍼티](#최상위-프로퍼티)
- [메서드를 다른 클래스에 추가: 확장 함수와 확장 프로퍼티](#메서드를-다른-클래스에-추가-확장-함수와-확장-프로퍼티)
- [임포트와 확장 함수](#임포트와-확장-함수)
- [확장 함수로 유틸리티 함수 정의](#확장-함수로-유틸리티-함수-정의)
- [확장 함수는 오버라이드 할 수 없다.](#확장-함수는-오버라이드-할-수-없다)
- [확장 프로퍼티](#확장-프로퍼티)
- [컬렉션 처리: 가변 길이 인자, 중위 함수 호출, 라이브러리 지원](#컬렉션-처리-가변-길이-인자-중위-함수-호출-라이브러리-지원)
- [문자열과 정규식 다루기](#문자열과-정규식-다루기)
    - [문자열 나누기](#문자열-나누기)
    - [정규식과 3중 따옴표로 묶은 문자열](#정규식과-3중-따옴표로-묶은-문자열)
- [코드 다듬기: 로컬 함수와 확장](#코드-다듬기-로컬-함수와-확장)

[4장 클래스, 객체, 인터페이스](#4장-클래스-객체-인터페이스)
- [코틀린 인터페이스](#코틀린-인터페이스)
    - [동일한 메서드를 구현하는 다른 인터페이스 정의](#동일한-메서드를-구현하는-다른-인터페이스-정의)
- [open, final, abstract 변경자: 기본적으로 final](#open-final-abstract-변경자-기본적으로-final)
    - [오버라이드 금지하기](#오버라이드-금지하기)
    - [추상 클래스 정의하기](#추상-클래스-정의하기)
-[가시성 변경자: 기본적으로 공개](#가시성-변경자-기본적으로-공개)
- [접근자의 가시성 변경](#접근자의-가시성-변경)
- [봉인된 클래스: 클래스 계층 정의 시 계층 확장 제한](#봉인된-클래스-클래스-계층-정의-시-계층-확장-제한)
- [게터와 세터에서 뒷받침하는 필드에 접근](#게터와-세터에서-뒷받침하는-필드에-접근)
- [클래스 위임 사용하기](#클래스-위임-사용하기)
- [인터페이스에 선언된 프로퍼티 구현](#인터페이스에-선언된-프로퍼티-구현)
- [object를 통해 싱글턴 클래스 쉽게 만들기, 예시](#object-를-통해-싱글턴-클래스-쉽게-만들기)
- [동반 객체: 팩토리 메서드와 정적 멤버가 들어갈 장소](#동반-객체-팩토리-메서드와-정적-멤버가-들어갈-장소)
- [동반 객체에서 인터페이스 구현하기](#동반-객체에서-인터페이스-구현하기)
- [동반 객체에 대한 확장 함수 정의하기](#동반-객체에-대한-확장-함수-정의하기)
- [객체 식: 무명 내부 클래스를 다른 방식으로 작성](#객체-식-무명-내부-클래스를-다른-방식으로-작성)
- [무명 객체 안에서 로컬 변수 사용하기](#무명-객체-안에서-로컬-변수-사용하기)
[5장 람다로 프로그래밍](#5장-람다로-프로그래밍)
- [람다 식과 멤버 참조](#람다-식과-멤버-참조)
    - [컬렉션 직접 검색](#컬렉션-직접-검색)
    - [람다를 사용해 컬렉션 검색](#람다를-사용해-컬렉션-검색)
    - [멤버 참조를 사용해 컬렉션 검색하기](#멤버-참조를-사용해-컬렉션-검색하기)
    - [현재 영역에 있는 변수에 접근](#현재-영역에-있는-변수에-접근)
    - [멤버 참조](#멤버-참조)
        - [함수를 적재적소에 사용하라: count와 size](#함수를-적재적소에-사용하라-count와-size)
        - [find](#find)
    - [groupBy: 리스트를 여러 그룹으로 이뤄진 맵으로 변경](#groupby-리스트를-여러-그룹으로-이뤄진-맵으로-변경)
    - [flatMap과 flatten: 중첩된 컬렉션 안의 원소 처리](#flatmap과-flatten-중첩된-컬렉션-안의-원소-처리)
    - [지연 계산(lazy) 컬렉션 연산](#지연-계산lazy-컬렉션-연산)
    - [시퀀스 연산 실행: 중간 연산과 최종 연산](#시퀀스-연산-실행-중간-연산과-최종-연산)
    - [시퀀스 만들기](#시퀀스-만들기)
        - [자연수의 시퀀스를 생성하고 사용하기](#자연수의-시퀀스를-생성하고-사용하기)
    - [자바 메서드에 람다를 인자로 전달](#자바-메서드에-람다를-인자로-전달)
    - [SAM 생성자: 람다를 함수형 인터페이스로 명시적으로 변경](#sam-생성자-람다를-함수형-인터페이스로-명시적으로-변경)
        - [SAM 생성자를 사용해 listener 인스턴스 재사용하기](#sam-생성자를-사용해-listener-인스턴스-재사용하기)
    - [수신 객체 지정 람다: with와 apply](#수신-객체-지정-람다-with와-apply)
        - [with 함수](#with-함수)
        - [with와 식을 본문으로 하는 함수를 활용해 알파벳 만들기](#with와-식을-본문으로-하는-함수를-활용해-알파벳-만들기)
        - [apply](#apply)

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


### 최상위 프로퍼티

``` kotlin
var opCount = 0

fun performOperation() {
    opCOunt++
}

fun reportOperationCount() {
    println("Operation performed $opCount times");
}
```

**최상위 프로퍼티도 다른 모든 프로퍼티 처럼 접근자 메서드를 통해 자바 코드에 노출된다.**
**val의 경우 게터, var의 경우 게터와 세터가 생긴다.**

``` kotlin
const val UNIX_LINE_SEPARATOR = "\n" == public static final String UNIX_LINE_SEPARATOR;
```
[돌아가기](#목차)

### 메서드를 다른 클래스에 추가: 확장 함수와 확장 프로퍼티

> 확장 함수란?   
어떤 클래스의 멤버 메서드인 것처럼 호출할 수 있지만 그 클래스의 밖에 선언된 함수이다.

``` kotlin
package Strings

fun String.lastChar(): Char = this.get(this.length-1)

확장 함수 호출 방법
println("Kotlin".lastChar()) 
=> Kotlin 이 수신 객체, String이 수신 객체 타입이다.

```
수신 객체 타입: 추가하려는 함수 이름 앞에 확장할 클래스의 이름을 덧붙이는 것   
수신 객체: 확장 함수가 호출되는 대상이 되는 값(this) (그 클래스에 속한 인스턴스 객체)

``` kotlin
fun String.lastChar(): Char = get(length-1)

일반 메서드의 본문에서 this를 사용할 때와 마찬가지로 확장 함수 본문에도 this를 쓸 수 있다.
```

[돌아가기](#목차)


### 임포트와 확장 함수

**확장 함수를 사용하기 위해서는 그 함수를 다른 클래스나 함수와 마찬가지로 임포트 해야 한다.**

``` kotlin
import strings.lastChar
import strings.*

as 키워드를 사용하면 임포트한 클래스나 함수를 다른 이름으로 부를 수 있다.
import strings.lastChar as last

val c = "Kotlin".last()

자바에서 확장 함수 호출

확장 함수를 StringUtil.kt 파일에 정의 했다면
char c = StringUtil.Kt.lastChar("Java");
이런식으로 자바에서 확장함수를 사용할 수 있다.
```

[돌아가기](#목차)

### 확장 함수로 유틸리티 함수 정의

``` kotlin
fun <T> Collection<T>.joinToString(
    separator: String = ", ",
    prefix: String = "",
    postfix: String = ""
): String {
    val result = StringBuilder(prefix)
    for(idx, elem) in this.withIndex()) {
        if(idx > 0) result.append(separator)
        result.append(elem)
    }

    result.append(postfix)
    return result.toString()
}

fun main() {
    val list = listOf(1, 2, 3)
    println(list.joinToString(separator = "; ", prefix = "(", postfix = ")"))
}
=> (1; 2; 3)
```
**확장 함수가 정적 메서드와 같은 특징을 가지므로 확장 함수를 하위 클래스에서 오버라이드 할 순 없다.**

[돌아가기](#목차)

### 확장 함수는 오버라이드 할 수 없다

``` kotlin
open class View {
    open fun click() = println("View Clicked")
}

class Button: View() {
    override fun click() = println("Button clicked")
}

fun main() {
    val view: View = Button()
    view.click()
}

>> Button Clicked

view에 저장된 값의 실제 타입에 따라 호출할 메서드가 결정된다.
```

확장 함수 오버라이드
``` kotlin
open class View {
    open fun click() = println("View Clicked")
}

class Button: View() {
    override fun click() = println("Button clicked")
}

fun View.showOff() = println("I'm a view!")
fun Button.showOff() = println("I'm a button!")

fun main() {
    val view: View = Button()
    view.showOff()
}

>> I'm a view!

view가 가리키는 객체의 실제 타입이 Button이지만, 이 경우 view의 타입이 View이기 때문에 무조건 View의 확장 함수가 호출된다.
```
**확장 함수를 static 메서드로 컴파일 하기 때문에 오버라이딩이 안된다.**

[돌아가기](#목차)


### 확장 프로퍼티

``` kotlin
var StringBuilder.lastChar: Char
    get() = get(length - 1)  <- 프로퍼티 게터
    set(value: Char) {       <- 프로퍼티 세터
        this.setCharAt(length - 1, value)
    }

fun main() {
    val sb = StringBuilder("Kotlin?")
    sb.lastChar =  '!'
    println(sb)
}
>>> Kotlin!

기본 게터 구현을 제공할 수 없으므로 최소한 게터는 꼭 정의를 해야한다.
```

### 컬렉션 처리: 가변 길이 인자, 중위 함수 호출, 라이브러리 지원

컬렉션 처리 시 쓸 수 있는 코틀린 표준 라이브러리 함수   
- vararg 키워드 사용하면 호출 시 인자 개수가 달라질 수 있는 함수를 정의할 수 있다.
- 중위 함수 호출 구문을 사용하면 인자가 하나뿐인 메서드를 간편하게 호출할 수 있다.
- 구조 분해 선언 사용하면 복합적인 값 분해해서 여러 변수에 나눠 담을 수 있따.

#### 가변 인자 함수: 인자의 개수가 달라질 수 있는 함수 정의

``` kotlin
val list = listOf(2, 3, 5, 7, 11)

fun listOf<T>(vararg values: T): List<T> { ... }

자바에서 타입 뒤에 ...를 붙이는 대신 코틀린에선 파라미터 앞에 vararg 변경자를 붙인다.

fun main(args: Array<String>) {
    val list = listOf("args: ", *args) <- 스프레드 연산자가 배열의 내용을 펼쳐준다.
    println(list)
}

스프레드 연산자를 통해 배열에 들어있는 값과 다른 여러 값을 함께 써서 함수를 호출할 수 있음을 보여준다.
```

#### 값의 쌍 다루기: 중위 호출과 구조 분해 선언 

맵을 만들려면 mapOf 함수를 사용한다.

``` kotlin
val map = mapOf(1 to "one", 7 to "seven", 53 to "fifty-three")

to는 to라는 일반 메서드를 호출한 것이다.
중위 호출 시에는 수신 객체와 유일한 메서드 인자 사이에 메서드 이름을 넣는다.

1.to("one") <- "to" 메서드를 일반적인 방식으로 호출함
1 to "one"  <- "to" 메서드를 중위 호출 방식으로 호출함
```

**함수를 중위 호출에 사용하게 허용하고 싶으면 infix 변경자를 함수 선언 앞에 추가해야 한다.**

``` kotlin
infix fun Any.to(other: Any) = Pair(this, other)
```

to 함수는 Pair의 인스턴스를 반환한다.
> Pair란   
코틀린 표준 라이브러리 클래스로, 이름대로 두 원소로 이뤄진 순서쌍을 표현한다.

```kotlin
val (number, name) = 1 to "one" => 구조 분해 선언 이라고 한다.
```
[돌아가기](#목차)

## 문자열과 정규식 다루기

### 문자열 나누기

``` java
"12.345-6.A".split(".")

>> [12, 345-6, A] 라고 예상하지만 자바의 split 메서드는 빈 배열을 반환한다.

split의 구분 문자열은 정규식 이기 때문에 마침표는 모든 무낮를 나타내는 정규식으로 해석되었다.
```

``` kotlin
"12.345-6.A".split("\\.|-".toRegex()) <- 정규식을 명시적으로 만듬
>> [12, 345, 6, A]

"12.345-6.A".split(".", "-")
>> [12, 345, 6, A]
```

[돌아가기](#목차)


### 정규식과 3중 따옴표로 묶은 문자열

#### String 확장 함수를 사용해 경로 파싱하기

``` kotlin
fun parsePath(path: String) {
    val directory = path.substringBeforeLast("/")
    val fullName = path.substringAfterlast("/")
    val fileName = fullName.substringBeforeLast(".")
    val extension = fullName.substringAfterLast(".")

    println("Dir: $directory, name: $fileName, ext: $extension")
}

parsePath("/Users/yole/kotlin-book/chapter.adoc")

>> Dir: /Users/yole/kotlin-book, name: chapter, ext: adoc
```


[돌아가기](#목차)

## 코드 다듬기: 로컬 함수와 확장

#### 코드 중복을 보여주는 예제

``` kotlin
class User(val id: Int, val name: String, val address: String)

fun saveUser(user: User) {
    if(user.name.isEmpty()) {
        throw IllegalArgumentException(
            "Can't save user ${user.id}: empty Name"
        )
    }

    if(user.address.isEmpty()) {
        throw IllegalArgumentException(
            "Can't save user ${user.id}: empty Address"
        )
    }
}

saveUser(User(1, "", ""))

>> javja.lang.IllegalArgumentException: Can't save user 1: empty Name

클래스가 사용자의 필드를 검증할 때 필요한 여러 경우를 하나씩 처리하는 메서드로 넘쳐 날 수 있다.
```

#### 로컬 함수를 사용해 코드 중복 줄이기

``` kotlin

class User(val id: Int, val name: String, val address: String)

fun saveUser(user: User) {
    fun validate(user: User,        <- 한 필드 검증하는 로컬 함수 정의
                    value: String,
                    fieldName: String)
            {
            if(value.isEmpty()) {
                throw IllegalArgumentException(
                    "Can't save user ${user.id}: empty $fieldName"
                )
            }
        }

    validate(user, user.name, "Name")
    validate(user, user.address, "Address")
}
```

#### 로컬 함수에서 바깥 함수의 파라미터 접근하기

``` kotlin
class User(val id: Int, val name: String, val address: String) 

fun saveUser(user: User) {
    fun validate(value: String, fieldName: String) <- saveUser 함수의 user 파라미터를 중복 사용하지 않는다. {
        if (value.isEmpty()) {
            throw IllegalArgumentException(
                "Can't save user ${user.id}: " + <- 바깥 함수의 파라미터에 직접 접근 가능
                "empty $fieldName"
            )
        }
    }

    validate(user.name, "Name")
    validate(user.address, "Address")
}
```

#### 검증 로직을 확장 함수로 추출하기

``` kotlin
class User(val id: Int, val name: String, val address: String)

fun User.validateBeforeSave() {
    fun validate(value: String, fieldName: String) {
        if(value.isEmpty()) {
            throw IllegalArgumentException(
                "Can't save user $id: empty $fieldName"  <- User의 프로퍼티 직접 사용 가능
            )
        }
    }

    validate(name, "Name")
    validate(address, "Address")
}

fun saveUser(user: User) {
    user.validateBeforeSave() <- 확장 함수 호출

    // user를 데이터베이스에 저장
}
```

> 검증 로직은 User를 사용하는 다른 곳에서는 쓰이지 않는 기능이기 때문에 User에 포함시키고 싶지 않다.


확장 함수를 로컬 함수로 정의할 수 있다. => User.validateBeforeSave를   
saveUser 내부에 로컬 함수로 넣을 수 있다. 하지만 중첩된 함수의 깊이가 깊어지면 코드를   
읽기 어려워 지므로 **한 단계만 함수를 중첩**시키라고 권장한다.

[돌아가기](#목차)

# 4장 클래스, 객체, 인터페이스

## 4.1 클래스 계층 정의

### 코틀린 인터페이스
   
자바8 인터페이스와 비슷하게 추상 메서드와 구현이 있는 메서드도 정의할 수 있다.

> 인터페이스에는 아무런 상태도 들어갈 수 없다.

``` kotlin

interface Clickable {
    fun click()
}

class Button : Clickable {
    override fun click() = println("I was clicked")
}

Button().click()

>> Iwas clicked

코틀린에서는 자바와 달리 override 변경자를 꼭 사용해야 한다.
```

#### 동일한 메서드를 구현하는 다른 인터페이스 정의

``` kotlin
interface Clickable {
    fun click()
    fun showOff() = println("I'm clickable!")
}

interface Focusable {
    fun setFocus(b: Boolean) = 
        println("I ${if (b) "got" else "lost"} focus.")
    
    fun showOff() = println("I'm focusable!")
}

class Button : Clickable, Focusable {
    override fun click() = println("I was clicked")
    override fun showOff() {
        super<Clickable>.showOff()
        super<Focusable>.showOff()
    }
}

이름과 시그니처가 같은 멤버 메서드에 대해 둘 이상의 디폴트 구현이 있는 경우 인터페이스를 구현하는 하위 클래스에서 명시적으로 새로운 구현을 제공해야 한다.

fun main(args: Array<String> {
    val button = Button()

    button.showOff()
    button.setFocus(true)
    button.click()
})

>> I'm clickable!
I'm focusable!
I got focus
```

[돌아가기](#목차)


### open, final, abstract 변경자: 기본적으로 final

> 상속을 위한 설계와 문서를 갖추거나, 그럴 수 없다면 상속을 금지하라   
하위 클래스에서 오버라이드하게 의도된 클래스와 메서드가 아니라면 모두 final로 만들어야 한다.

**코틀린의 클래스와 메서드는 기본적으로 final 이다.**

어떤 클래스와 메서드의 오버라이드를 허용하고 싶다면 open 변경자를 붙여야 한다.

#### 오버라이드 금지하기
``` kotlin
open class RichButton : Clickable {
    final override fun click() {}
    
    오버라이드 한 메서드를 하위 클래스에서 오버라이드 하지 못하게 하기 위해 final 붙임
}

override 메서드나 프로퍼티는 기본적으로 열려있음
```

[돌아가기](#목차)


#### 추상 클래스 정의하기

추상 클래스의 추상 멤버를 오버라이드 하는게 보통이기 때문에 추상 멤버는 항상 열려있다.   
=> open 변경자를 명시할 필요가 없다.

``` kotlin
abstract class Animated { <- 이 클래스는 추상 클래스이다. 인스턴스 만들 수 없음
    abstract fun animate() <- 추상 함수. 구현이 없으므로 하위 클래스에서 반드시 오버라이드 해야한다.
}

추상 클래스에 속했더라도 비추상 함수는 기본적으로 파이널이지만 원한다면 open으로
오버라이드를 허용할 수 있다.
open fun stopAnimating() {}

fun animateTwice() {}

```

> 인터페이스 멤버의 경우 final, open, abstract를 사용하지 않는다.   
인터페이스 멤버는 항상 열려 있으며 final로 변경할 수 없다.   
인터페잉스 멤버에게 본문이 없으면 자동으로 추상 멤버가 된다.


|변경자|이 변경자가 붙은 멤버는...|설명|
|---|---|---|
|final|오버라이드할 수 없음|클래스 멤버의 기본 변경자다.|
|open|오버라이드할 수 있음|반드시 open을 명시해야 오버라이드할 수 있다.|
|abstract|반드시 오버라이드해야 함|추상 클래스의 멤버에만 이 변경자를 붙일 수 있다. 추상 멤버에는 구현이 있으면 안된다.|
|override|상위 클래스나 상위 인스턴스의 멤버를 오버라이드 하는 중|오버라이드하는 멤버는 기본적으로 열려있다. 하위 클래스의 오버라이드를 금지하려면 final을 명시해야 한다.|



[돌아가기](#목차)

### 가시성 변경자: 기본적으로 공개

|변경자|클래스 멤버|최상위 선언|
|---|---|---|
|public(기본 가시성)|모든 곳에서 볼 수 있다|모든 곳에서 볼 수 있음|
|internal|같은 모듈 안에서만 볼 수 있음|같은 모듈 안에서만 볼 수 있음|
|protected|하위 클래스 안에서만 볼 수 있음|(최상위 선언에 적용할 수 없음)|
|private|같은 클래스 안에서만 볼 수 있음|같은 파일 안에서만 볼 수 있음|

``` kotlin
internal open class TalkativeButton : Focusable {
    private fun yell() = println("Hey!")
    protected fun whisper() = println("Let's talk!")
}

fun TalkativeButton.giveSpeech() {
    yell()
    whisper()
}

fun TalkativeButton.giveSpeech() { <- 오류: "public" 멤버가 자신의 internal 수신 타입인 "TalkativeButton"을 호출함
    yell() <- 오류: "yell"에 접근할 수 없음 "yell"은 TalkativeButton의 private 멤버 이기 때문
    
    whisper() 오류: whisper에 접근할 수 없음 protected 멤버이기 때문
}

public 함수 안에서 가시성이 더 낮은 타입을 참조하지 못하게 한다.

giveSpeech 확장 함수의 가시성을 internal로 바꾸거나, 
TalkativeButton 클래스의 가시성을 public으로 바꿔야 한다.
```
**자바에서는 같은 패지지 안에서 protected 멤버에 접근할 수 있지만, 코틀린에선 그렇지 않다는 점에서 자바와 코틀린의 protected가 다르다.**

[돌아가기](#목차)

### 접근자의 가시성 변경

``` kotlin
class LengthCounter {
    var counter: Int = 0
        private set
    fun addWord(word: String) {
        conuter += word.length
    }
}
```
외부 코드에서 길이의 합을 마음대로 바꾸지 못하게 클래스 내부에서만 길이를 변경하게 만들기 위해
private set을 통해 가시성을 제한한다.
   

#### 코틀린의 가시성 변경자와 자바   
- 코틀린의 public, protected, private 변경자는 컴파일된 자바 바이트코드 안에서도 그대로 유지된다.   
- 자바에선 private 클래스를 만들 수 없으므로 내부적으로 코틀린은 private 클래스를 패키지-전용 클래스로 컴파일 한다.   
- internal은 자바 바이트코드상에서는 publicdl 된다.

> internal   
1. 한 모듈에 속한 어떤 클래스를 모듈 밖에서 상속한 경우 그 하위 클래스 내부의 메서드 이름이 우연히 상위 클래스의 internal 메서드와 같아져,   
내부 메서드를 오버라이드하는 경우를 방지하기 위함   
2. 실수로 internal 클래스를 모듈 외부에서 사용하는 일을 막기 위함이다.

### 봉인된 클래스: 클래스 계층 정의 시 계층 확장 제한

``` kotlin
interface Expr

class Num(val value: Int) : Expr
class Sum(val left: Expr, val right: Expr) : Expr

fun eval(e: Expr) : Int = 
    when(e) {
        is Num -> e.value
        is Sum -> eval(e.right) + eval(e.left)
        else ->               <-- else 분기가 꼭 있어야 한다.
            throw IllegalArgumentException("Unknown expression")
    }
```

디폴트 분기(else)가 있어 불편하다.
- 클래스 계층에 새로운 하위 클래스를 추가하더라도 컴파일러가 when이 모든 경우를 처리하는지 제대로 검사할 수 없다.
- 실수로 클래스 처리를 잊어버려 디폴트 분기가 선택되어 심각한 버그가 발생할 수 있다.

> sealed 클래스는 상위 클래스에 붙여 상속한 하위 클래스 정의를 제한할 수 있다.   
sealed 클래스를 상속한 하위 클래스를 정의할 때는 반드시 상위 클래스 안에 중첩시켜야 한다.

``` kotlin
sealed class Expr {
    class Num(val value: Int) : Expr()
    class Sum(val left: Expr, val right: Expr) : Expr()
}

fun eval(e: Expr): Int =
    when(e) {
        is Expr.Num -> e.value
        is Expr.Sum -> eval(e.right) + eval(e.left)
    }
```
- when 식에서 sealed 클래스의 모든 하위 클래스를 처리한다면 디폴트 분기가 필요 없다.
- sealed로 표시된 클래스는 자동으로 Open dlek.
- 봉인된 클래스는 클래스 외부에 자신을 상속한 클래스를 둘 수 없다.
- 나중에 sealed 클래스의 상속 계층에 새로운 하위 클래스를 추가하면 when식이 컴파일 되지 않는다.
- 내부적으로 Expr클래스는 private 생성자를 가진다.

[돌아가기](#목차)

### 인터페이스에 선언된 프로퍼티 구현

``` kotlin
interface User {
    val nickname: String
}

User 인터페이스를 구현하는 클래스가 nickname의 값을 얻을 수 있는 방법을 제공해야 한다는 뜻
```

``` kotlin
interface User {
    val nickname: String
}

class PrivateUser(override val nickname: String) : User // 주 생성자에 있는 프로퍼티

class SubscribingUser(val email: String): User {
    override val nickname: String
        get() = email.substringBefore("@")  // 커스텀 게터
}

class FacebookUser(val accountId: Int) : User {
    override val nickname = getFacebookName(accountId)

    fun getFacebookName(accountId: Int): String {
        // return findById(accountId)
        return "abc"
    }
}


fun main() {
    println(PrivateUser("test@naver.com").nickname)
    println(SubscribingUser("test@naver.com").nickname)
}
```

``` kotlin
interface User {
    val email: String
    val nickname: String

}
```

``` kotlin
interface User {
    val email: String
    val nickname: String
        get() = email.substringBefore("@")
}

하위 클래스는 추상 프로퍼티인 emil을 반드시 오버라이드 해야 한다.
반면 nickname은 오버라이드하지 않고 상속할 수 있다.
```

> 자바애서 인터페이스의 필드는 public static final이 자동으로 붙는다.   
코틀린에서는 필드도 오버라이드를 할 수 있지만 자식 클래스가 필드 값을 얻을 수 있는 방법을 제공해야 한다.

[돌아가기](#목차)

### 게터와 세터에서 뒷받침하는 필드에 접근

``` kotlin
class User(val name: String) {
    var address: String = "unspecified"
        set(value: String) {
            println("""
                Address was changed for $name:
                "$field" -> "$value".
            """.trimIndent())
            field = value
        }
}

fun main() {
    val user = User("Alice")
    user.address = "고마로 13길 34-2"
    user.address = "고마로 13길 34-2 awefawef"
}

>>>
"unspecified" -> "고마로 13길 34-2".
Address was changed for Alice:
"고마로 13길 34-2" -> "고마로 13길 34-2 awefawef".

게터에서는 field 값만 읽을 수 있고
세터에서는 field 값을 읽거나 쓸 수 있으며 field 라는 특별한 식별자를 통해 뒷받침하는 필드에 접근할 수 있다.
```
[돌아가기](#목차)


### 클래스 위임 사용하기

``` kotlin
class CountingSet<T>(
    val innerSet: MutableCollection<T> = HashSet<T>()
): MutableCollection<T> by innerSet { <- MutableCollection의 구현을 innerSeet에게 위임
    var objectsAdded = 0


    // 아래 두 메서드는 위임하지 않고 새로운 구현을 제공
    override fun add(element: T): Boolean {
        objectsAdded++
        return innerSet.add(element)
    }

    override fun addAll(c: Collection<T>): Boolean {
        objectsAdded += c.size
        return innerSet.addAll(c)
    }
}

val cset = CountingSet<Int>()
cset.addAll(listOf(1, 1, 2))
println("${cset.objectsAdded} objects were added, ${cset.size} remain")

>> 3 objects were added, 2 remain

add와 addAll을 오버라이드 해서 카운터를 증가시키고,
MutableCollection 인터페이스의 나머지 메서드는 내부 컨테이너(innerSet)에게 위임한다.
```

> CountingSet에 MutableCollection의 구현 방식에 대한 의존관계가 생기지 않고 있다.

[돌아가기](#목차)

### object 를 통해 싱글턴 클래스 쉽게 만들기

``` kotlin
data class Person(val name: String) {
    object NameComparator: Comparator<Person> {
        override fun compare(p1: Person, p2: Person): Int =
            p1.name.compareTo(p2.name)
    }
}

val persons = listOf(Person("Bob"), Person("Alice"))
println(persons.sortedWith(Person.NameComparator))

>> [Person(name=Alice), Person(name=Bob)]
```

> 코틀린 object를 자바에서 사용하기
INSTANCE 키워드를 사용하면 된다.

### 동반 객체: 팩토리 메서드와 정적 멤버가 들어갈 장소

- 최상위 함수는 같은 패키지 클래스 내부의 private 멤버에 접근할 수 없다.
- 클래스의 인스턴스와 관계없이 호출해야 하지만, 클래스 내부 정보에 접근해야 하는 함수가 필요할 때는 클래스에 중첩된 객체 선언의 멤버 함수로 정의해야 한다.
- 동반 객체가 private 생성자를 호출하기 좋은 위치다.
- 동반 객체는 바깥쪽 클래스의 private 생성자도 호출할 수 있다.

``` kotlin
class User {
    val nickname: String

    constructor(email: String) {   <---- 부 생성자
        nickname = email.substringBefor("@")
    }

    constructor(facebookAccountId: Int) {   <---- 부 생성자
        nickname = getFacebookName(facebookAccountId)
    }
}
```


**부 생성자를 팩토리 메서드로 대신하기**

``` kotlin
class User private constructor(val nickname: String) { <--- 주 생성자를 비공개로 만든다.

    companion object {
        fun newSubscribingUser(email: String) = 
            User(email.substringBefore('@'))
        fun newFacebookUser(accountId: Int) = 
            User(getFacebookName(accountId))
    }
}

val subscribingUser = User.newSubscribingUser("bob@gmail.com")
val facebookUser = User.newFacebookUser(4)

println(subscribingUser.nickname)
>>> bob
```

[돌아가기](#목차)

### 동반 객체에서 인터페이스 구현하기

``` kotlin
interface JSONFactory<T> {
    fun fromJSON(jsonText: String) : T
}

class Person(val name: String) {
    companion object : JSONFactory<Person> {
        override fun fromJSON(jsonText: String) : Person = ... <-- 동반 객체가 인터페이스를 구현한다.
    }
}

fun loadFromJSON<T>(factory: JSONFactory<T>): T {
    ...
}
loadFromJSON(person) <-- 동반 객체의 인스턴스를 함수에 넘긴다.

>> 동반 객체가 구현한 JSONFactory의 인스턴스를 넘길 때 Person 클래스의 이름을 사용했다.
```

[돌아가기](#목차)


### 동반 객체에 대한 확장 함수 정의하기

``` kotlin
비즈니스 로직 모듈

class Person(val firstName: String, val lastName: String) {
    companion object {  
        <-- 비어있는 동반 객체를 선언 -->
    }
}

클라이언트 서버 통신 모듈
fun Person.Companion.fromJSON(json: String) : Person {  <-- 확장 함수를 선언
    ...
}

val p = Person.fromJSON(json)
```

- 다른 보통 확장 함수처럼 fromJSON도 클래스 멤버 함수로 보이지만 실제로는 멤버 함수가 아니다.
- 동반 객체에 대한 확장 함수를 작성할 수 있으려면 원래 클래스에 동반 객체를 꼭 선언해야 한다.

[돌아가기](#목차)


## 객체 식: 무명 내부 클래스를 다른 방식으로 작성

``` kotlin
window.addMouseListener(
    object : MouseAdapter() {  <-- MouseAdapter를 확장하는 무명 객체 선언
        override fun mouseClicked(e: MouseEvent) { <-- MouseAdapter의 메서드를 오버라이드 한다.
            ...
        }
        override fun mouseEntered(e: MouseEvent) { <-- MouseAdapter의 메서드를 오버라이드 한다.
            ...
        }
    }
)
```
- 객체 식은 클래스를 정의하고 그 클래스에 속한 인스턴스를 생성한다.
- 클래스나 인스턴스에 이름을 붙이지는 않는다.
- 객체에 이름을 붙여야 한다면 변수에 무명 객체를 대입하면 된다.
``` kotlin
val listener = object : MouseAdapter() {
    override fun mouseClicked(e: MouseEvent) { ... }
    override fun mouseEntered(e: MouseEvent) { ... }
}
```

> 한 클래스만 확장할 수 있는 자바의 무명 내부 클래스와 달리 코틀린 무명 클래스는 여러 인터페이스를 구현하거나 클래스를 확장하면서 인터페이스를 구현할 수 있다.

#### 객체 선언과 달리 무명 객체는 싱글턴이 아니다. 객체 식이 쓰일 때마다 새로운 인스턴스가 생성된다.

[돌아가기](#목차)

### 무명 객체 안에서 로컬 변수 사용하기

``` kotlin
fun countClicks(window: Window) {
    var clickCount = 0  
    window.addMouseListener(object : MouseAdapter() {
        override fun mouseClicked(e: MouseEvent) {
            clickCount++ <-- 로컬 변수의 값 변경 가능!
        }
    })
}
```

[돌아가기](#목차)

# 5장 람다로 프로그래밍

람다
- 람다는 기본적으로 다른 함수에 넘길 수 있는 작은 코드 조각을 뜻한다.

## 람다 식과 멤버 참조

### 컬렉션 직접 검색

``` kotlin
data class Person(val name: String, val age: Int)

fun findTheOldest(people: List<Person>) {
    var maxAge = 0
    var theOldest: Person? = null
    for(person in people) {
        if(person.age > maxAge) {
            maxAge = person.age
            theOldest = person
        }
    }
    println(theOldest)
}

fun main() {
    val people = listOf(Person("Alice", 29), Person("Bob", 31))

    findTheOldest(people)
}

>>> Person(name=Bob, age=31)
```

[돌아가기](#목차)

### 람다를 사용해 컬렉션 검색

``` kotlin
fun main() {
    val people = listOf(Person("Alice", 29), Person("Bob", 31))

    println(people.maxByOrNull { it.age })
}
```

[돌아가기](#목차)

### 멤버 참조를 사용해 컬렉션 검색하기

``` kotlin
fun main() {
    val people = listOf(Person("Alice", 29), Person("Bob", 31))

    println(people.maxByOrNull(Person::age))
}
```
- 코틀린에는 함수 호출 시 맨 뒤에 있는 인자가 람다 식이라면 그 람다를 괄호 밖으로 빼낼 수 있다.
- 둘 이상의 람다를 인자로 받는 함수라고 해도 인자 목록의 맨 마지막 람다만 밖으로 뺼 수 있다.   
    => 이런 경우엔 괄호를 사용하는 일반적인 함수 호출 구문을 사용하는 편이 낫다.

``` kotlin
val getAge = { p: Person -> p.age }
people.maxBy(getAge)
```
- 람다를 변수에 저장할 때는 파라미터의 타입을 추론할 문맥이 존재하지 않는다.

``` kotlin
val sum = { x: Int, y: Int -> 
        println("Computing the sum of $x and $y...")
        x + y
    }
println(sum(1, 2))
>>> Computing the sum of 1 and 2...
3
```
- 본문이 여러 줄로 이뤄진 경우 본문의 맨 마지막에 있는 식이 람다의 결과 값이 된다.


[돌아가기](#목차)

### 현재 영역에 있는 변수에 접근

``` kotlin
fun printMessagesWithPrefix(messages: Collection<String>, prefix: String) {
    messages.forEach {
        println("$prefix $it")
    }
}

fun main() {
    val errors = listOf("403 Forbidden", "404 Not Found")
    printMessagesWithPrefix(errors, "Error:")
}
```
- forEach 문 안에서 바깥 변수인 prefix에 접근할 수 있다.
- 바깥 변수의 값도 변경 가능하다   

**람다에서 람다 밖 함수에 있는 파이널이 아닌 변수에만 접근할 수 있고 변경도 가능하다**

``` kotlin
fun tryToCountButtonClicks(button: Button) : Int {
    var clicks = 0
    button.onClick { clicks++ }
    return clicks
}

이 함수는 항상 0을 반환한다.
onClick 핸들러는 tryToCountButtonClicks 메서드가 clicks를 반환한 다음에 호출되기 때문이다.

즉 람다를 이벤트 핸들러나 다른 비동기적으로 실행되는 코드로 활용하는 경우 함수 호출이 끝난 다음에 로컬 변수가 변경된다는 의미이다.
```

[돌아가기](#목차)

## 멤버 참조
::는 클래스 이름과 여러분이 참조하려는 멤버(프로퍼티나 메서드) 이름 사이에 위치한다.

``` kotlin

people.maxBy(Person::age)
people.maxBy { p -> p.age }
people.maxBy { it. age }

최상위에 선언된(그리고 다른 클래스의 멤버가 아닌) 함수나 프로퍼티를 참조할 수도 있다.

fun salute() = println("Salute!")
run(::salute)
>>> Salute!
```

``` kotlin
생성자 참조

data class Person(val name: String, val age: Int)

val createPerson = ::Person <- Person의 인스턴스를 만드는 동작을 값으로 저장
val p = createPerson("Alice", 29)

println(p)
>>> Person(name=Alice, age=29)
```

``` kotlin
확장 함수도 멤버 함수와 똑같은 방식으로 참조할 수 있다.

fun Person.isAdult() = age >= 21
val predicate = Person::isAdult
```

- isAdult는 Person의 클래스 멤버가 아니고 확장 함수다.
- person.isAdult() 인스턴스로 멤버 호출 할 수 있는 것처럼 Person::isAdult로 멤버 참조 구문을 사용해 이 확장 함수에 대한 참조를 얻을 수 있다.

[돌아가기](#목차)

### 함수를 적재적소에 사용하라: count와 size

``` kotlin
println(people.filter { it.age <= 27}.size)

이 코드는 처리하면 조건을 만족하는 모든 원소가 들어가는 중간 컬렉션이 생기게 된다.
반면 count는 조건을 만족하는 원소의 개수만을 추적하지 조건을 만족하는 원소를 따로 저장하지 않기에
count가 훨씬 더 효율적이다.
```

[돌아가기](#목차)

### find
``` kotlin
lisfOf(Person("Alice", 27), Person("Bob", 31))
println(people.find{it.age <= 27})
>>> Person(name=Alice, age=27)

find는 조건을 만족하는 원소가 하나라도 있는 경우 가장 먼저 조건을 만족한 원소를 반환한다.
만족하는 원소가 전혀 없는 경우 null을 반환

find는 firstOrNull과 같다.
조건 만족하는 원소가 없으면 null이 나온다느 ㄴ사실을 더 명확히 하고 싶다면 firstOrNull을 쓸 수 있다.
```

[돌아가기](#목차)

## groupBy: 리스트를 여러 그룹으로 이뤄진 맵으로 변경
``` kotlin
val list = listOf("a", "ab", "b")
println(list.groupBy(String::first))

원소를 구분하는 특성이 키이고 키 값에 따른 각 그룹이 값인 맵이다.
반환 타입 => Map<Int, List<Person>>
```

[돌아가기](#목차)

## flatMap과 flatten: 중첩된 컬렉션 안의 원소 처리

``` kotlin

val strings = listOf("abc", "def")
println(strings.flatMap { it.toList() })
```
1. map 연산인 it.toList()로 [[a, b, c], [d, e, f]]가 된다.
2. flatten 으로 [a, b, c, d, e, f] 가 된다.

[돌아가기](#목차)

## 지연 계산(lazy) 컬렉션 연산

``` kotlin
val num = listOf("1", "2", "3", "4", "5")
println(num.map { it.toInt() }.filter { it % 2 == 0 })
```

**filter와 map이 리스트를 반환하므로 연쇄 호출이 리스트를 2개 만들어 낸다.**
=> 원소가 수백만 개 라면 효율이 엄청나게 떨어진다.

``` kotlin
val num = listOf("1", "2", "3", "4", "5")

num.asSequence()
    .map { it.toInt() }
    .filter { it % 2 == 0 }
    .toList()

```
1. 원본 컬렉션을 시퀀스로 변환
2. 시퀀스도 컬레션과 똑같은 API를 제공한다.
3. toList() <- 결과 시퀀스를 다시 리스트로 반환한다.

=> 중간 결과를 저장하는 컬렉션이 생기지 않기 때문에 원소가 많은 경우 성능이 좋아진다.

> 시퀀스에 대한 연산을 지연 계산하기 때문에 계산을 실행시키려면 최종 시퀀스의 원소를 하나씩 이터레이션하거나
최종 시퀀스를 리스트로 변환해야 한다.

[돌아가기](#목차)

## 시퀀스 연산 실행: 중간 연산과 최종 연산

- 시퀀스에 대한 연산은 중간 연산과 최종 연산으로 나뉜다.
- 중간 연산은 다른 시퀀스를 반환한다. 그 시퀀스는 최초 시퀀스의 원소를 변환하는 방법을 안다.
- 최종 연산은 결과를 반환한다.
- 결과는 최초 컬렉션에 대해 변환을 적용한 시퀀스로부터 일련의 계산을 수행해 얻을 수 있는 컬렉션이나 원소, 숫자 또는 객체이다.

중간 연산은 항상 지연 계산된다.
``` kotlin
val num = listOf(1, 2, 3, 4)

num.asSequence()
    .map{ print("map($it) "); it*it}
    .filter { print("filter($it) "); it % 2 == 0 }

아무 내용도 출력되지 않는다.
map과 filter 변환이 늦춰져서 결과를 얻을 필요가 있을 때(즉 최종 연산이 호출될 때) 적용된다.

num.asSequence()
    .map{ print("map($it) "); it*it}
    .filter { print("filter($it) "); it % 2 == 0 }
    .toList()

최종 연산을 호출하면 연기됐던 모든 계산이 수행된다.
>>> map(1) filter(1) map(2) filter(4) map(3) filter(9) map(4) filter(16) 


num
    .map{ print("map($it) "); it*it}
    .filter { print("filter($it) "); it % 2 == 0 }
    .toList()

시퀀스가 없다면 모든 원소에 대해 리스트를 반환하는 map과 filter를 적용시킨다.
map(1) map(2) map(3) map(4) filter(1) filter(4) filter(9) filter(16) 
```

- 첫 번째 원소가 처리되고 다시 두 번째 원소가 처리되는 식으로 모든 원소에 대해 적용된다.
- 원소에 연산을 차례대로 적용하다가 결과가 얻어지면 그 이후의 원소에 대해선 변환이 이뤄지지 않을 수 있다.

``` kotlin
println(listOf(1, 2, 3, 4).asSequence().map{it*it}.find{it > 3})

즉시 계산
[1, 2, 3, 4] map-> [1, 4, 9, 16] find-> 4 결과

지연 계산
[1, 2, 3, 4] map-> [1, 4] find->  4 결과
4에서 이미 답을 찾았기 때문에 3과 4를 처리할 필요가 없어진다.
```
> 시퀀스를 사용할 때 filter를 적용하고 map을 적용하면 전체 변환 횟수가 줄어든다.

[돌아가기](#목차)

## 시퀀스 만들기

### 자연수의 시퀀스를 생성하고 사용하기

``` kotlin
val naturalNumbers = generateSequence(0) { it + 1 }
val numbersTo100 = naturalNumbers.takeWhile { it <= 100 }

println(numbersTo100.sum()) -> 모든 연산은 "sum"의 결과를 계산할 때 수행된다.

>>> 최종 연산 수행 전까진 시퀀스의 각 숫자는 계산되지 않는다.
```

## 자바 메서드에 람다를 인자로 전달

> 단일 추상 메서드(함수형 인터페이스)에는 코틀린 람다를 전달 할 수 있다.

람다로 전달 될 때 코틀린 컴파일러는 람다를 무명 클래스와 인스턴스를 만들어준다.

``` kotlin
// java
void postponeComputation(int delay, Runnable computation);

// kotlin
postponeComputation(1000) { println(42) }

객체 식을 함수형 인터페이스 구현으로 넘긴다.
postponeComputation(1000, object : Runnable {
    override fun run() {
        println(42)
    }
})

postponeComputation(1000) { println(42) } <- 프로그램 전체에서 Runnable의 인스턴스는 단 하나만 만들어진다.
```

- 객체를 명시적으로 선언하는 경우 메서드 호출할 때마다 새로운 객체가 생성된다.
- 정의가 들어있는 함수의 변수에 접근하지 않는 람다는 대응하는 무명 객체를 메서드를 호출할 때마다 반복 사용한다.

``` kotlin
명시적인 object 선언을 사용하면서 람다와 동일한 코드

val runnable = Runnable { println(42) }
fun handleComputation() {
    postponeComputation(1000, runnable) <- 모든 handleComputation 호출에 같은 객체를 사용한다.
}

람다가 주변 영역의 변수를 포획한다면 매 호출마다 같은 인스턴스를 사용할 수 없다.

fun handleComputation(id: String) { <- 람다 안에서 "id" 변수 포획
    postponeComputation(1000) { println(id) } <- handleComputation을 호출할 때마다 새로 Runnable 인스턴스를 만든다.
}
```

[돌아가기](#목차)

## SAM 생성자: 람다를 함수형 인터페이스로 명시적으로 변경

> SAM 생성자는 람다를 함수형 인터페이스의 인스턴스로 변환할 수 있게 컴파일러가 자동으로 생성한 함수다.

- SAM 생성자의 이름은 사용하려는 함수형 인터페이스의 이름과 같다.
- SAM 생성자는 함수형 인터페이스의 유일한 추상 메서드의 본문에 사용할 람다만을 인자로 받아서 함수형 인터페이스를 구현하는 클래스의 인스턴스를 반환한다.

### SAM 생성자를 사용해 listener 인스턴스 재사용하기

``` kotlin
val listener = OnClickListener { view -> 
    val text = when(view.id) {
        R.id.button1 -> "First button"
        R.id.button2 -> "Second button"
        else -> "Unknown button"
    }
    toast(text)
}

button1.setOnClickListener(listener)
button2.setOnClickListener(listener)
```

> 람다에는 무명 객체와 달리 인스턴스 자신을 가리키는 this가 없다.   
컴파일러 입장에서 보면 람다는 코드 블록일 뿐이고, 객체가 아니므로 객체처럼 람다를 참조할 수는 없다.   
람다 안에서의 this는 그 람다를 둘러싼 클래스의 인스턴스를 가리킨다.

[돌아가기](#목차)

## 수신 객체 지정 람다: with와 apply

### with 함수

``` kotlin
fun alphabet(): String {
    val result = StringBuilder()
    for(letter in 'A'..'Z') {
        result.append(letter)
    }
    result.append("\nNow I know hte alphabet!")
    return result.toString()
}

fun main() {
    println(alphabet())
}

result에 대해 다른 여러 메서드를 호출하면서 매번 result를 반복 사용함


fun alphabet(): String {
    val stringBuilder = StringBuilder()
    return with(stringBuilder) {       <- 메서드를 호출하려는 수신 객체를 지정
        for(letter in 'A'..'Z') {
            this.append(letter)     <- "this"를 명시해서 앞에서 지정한 수신 객체의 메서드 호출
        }
        append("\nNow I know the alphabet!")    <- "this" 생략하고 메서드 호출
        this.toString() <- 람다에서 값 반환
    }
}

fun main() {
    println(alphabet())
}
```

- this와 점(.) 사용하지 않고 프로퍼티나 메서드 이름만 사용해도 수신 객체의 멤버에 접근 가능하다.

[돌아가기](#목차)

### with와 식을 본문으로 하는 함수를 활용해 알파벳 만들기

``` kotlin
fun alphabet() = with(StringBuilder()) {
    ('A'..'Z').forEach{
        append(it)
    }
    append("\nNow I know the alphabet!")
    toString()
}

fun main() {
    println(alphabet())
}
```

> with가 반환하는 값은 람다 코드를 실행한 결과며, 그 결과는 람다 식의 본문에 있는 마지막 식의 값이다.

[돌아가기](#목차)


## apply

``` kotlin
fun alphabet() = StringBuilder().apply {
    ('A'..'Z').forEach{
        append(it)
    }
    append("\nNow I know the alphabet!")
}.toString()

fun main() {
    println(alphabet())
}
```

> apply 함수는 객체의 인ㅡ턴스를 만들면서 즉시 프로퍼티 중 일부를 초기화해야 하는 경우 유용하다.

[돌아가기](#목차)

# 6장 코틀린 타입 시스템

- 널이 될 수 있는 타입과 널을 처리하는 구문의 문법
- 코틀린 원시 타입 소개와 자바 타입과 코틀린 원시 타입의 관계
- 코틀린 컬렉션 소개화 자바 컬렉션과 코틀린 컬렉션의 관계

## 널 가능성

> NullPointerException 문제를 실행 시점에서 컴파일 시점으로 옮기는 것

[돌아가기](#목차)

## 널이 될 수 있는 타입

``` java
int strLen(String s) {
    return s.length();
}

- strLen(null) 처럼 직접 null 리터럴을 사용하는 경우
- 변수나 식의 값이 실행 시점에 null이 될 수 있는 경우
```

- 널이 인자로 들어올 수 없다면 
    ``` kotlin
    fun strLen(s: String) = s.length()

    strLen(null)
    ERROR: Null can not be a value of a non-null type String
    ```
=> strLen에 null이거나 널이 될 수 있는 인자를 넘기는 것은 금지된다.

- 널과 문자열을 인자로 받을 수 있다면
    ``` kotlin
    fun strLen(s: String?) = s.length

    fun strLen(s: String?) = s.length

    널이 될 수 있는 타입의 변수가 있다면 그에 대해 수행할 수 있는 연산이 제한된다.
    널이 될 수 있는 타입인 변수에 대해 변수.메서드() 처럼 메서드를 직접 호출할 수는 없다.
    ```

- 널이 될 수 있는 값을 널이 될 수 없는 타입의 변수에 대입할 수 없다.
    ``` kotlin
    val x: String? = null
    var y: String = x

    ERROR: Type mismatch
    ```

- 널이 될 수 있는 타입의 값을 널이 될 수 없는 타입의 파라미터를 받는 함수에 전달 할 수 없다.
    ``` kotlin
    strLen(x)

    ERROR: Type mismatch
    ```

[돌아가기](#목차)

### if 검사를 통해 null 값 다루기

``` kotlin
fun strLenSafe(s: String?): Int = 
    if(s != null) s.length else 0

val x: String? = null
println(strLenSafe(x))
>>> 0

println(strLenSafe("abc"))
>>> 3
```
[돌아가기](#목차)

## 타입의 의미

타입이란
> 타입은 분류로 타입은 어떤 값들이 가능한지와 그 타입에 대해 수행할 수 있는 연산의 종류를 결정한다.

[돌아가기](#목차)

## 안전한 호출 연산자: ?.

- ?.은 null 검사와 메서드 호출을 한 번의 연산으로 수행한다
    ``` kotlin
    s?.toUpperCase() 는 if(s != null) s.toUpperCase() else null 과 같다.
    ```
- 안전한 호출의 결과 타입도 널이 될 수 있는 타입이다.

[돌아가기](#목차)

## 엘비스 연산자 ?:

> 코틀린에서는 return이나 throw 등의 연산도 식이다.   
엘비스 연산자의 우항에 return, throw 등의 연산을 넣을 수 있다.   
