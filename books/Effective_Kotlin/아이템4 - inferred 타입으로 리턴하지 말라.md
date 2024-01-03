> [!info] inferred 타입은 정확하게 오른쪽 피연산자에 맞게 설정된다.
> 절대 슈퍼클래스 또는 인터페이스로 설정되지 않는다.
> ``` kotlin
> open class Animal
> class Zebra: Animal()
> 
> fun main() {
> 	var animal = Zebra()
> 	animal = Animal() // 오류 발생 Type mismatch
> }
> 타입을 명시적으로 지정해서 이러한 문제를 해결할 수 있다.
> var animal: Animal = Zebra()

### inferred 타입을 노출하여 위험한 일이 발생하는 경우
``` kotlin
interface CarFactory {
	fun produce(): Car
}

val DEFAULT_CAR: Car = Fiat126P()

DFAULT_CAR는 Car로 명시적으로 지정되어 있으므로 따로 필요없다고
판단해서 함수의 리턴 타입을 제거해 버렸다.

interface CarFactory {
	fun produce(): DEFAULT_CAR
}

이후 다른 개발자가 DEFAULT_CAR는 타입 추론에 의해 자동으로 타입이 지정될 것이여서
Car를 명시적으로 지정하지 않아도 된다고 생각해서, 코드를 변경한다

val DEFAULT_CAR = FIat126P()

CarFactory는 Fiat126P 이외의 자동차를 생산하지 못하게 되었다.
```

## 정리
- 타입을 확실하게 지정해야 하는 경우 명시적으로 타입을 지정하라
- 외부 API를 만들 때는 반드시 타입을 지정하라
- 지정한 타입을 특별한 이유와 확실한 확인 없이는 제거하지 말라
- **inferred 타입은 프로젝트가 진전될 때, 제한이 너무 많아지거나 예측하지 못한 결과를 낼 수 있다.**

#effective 