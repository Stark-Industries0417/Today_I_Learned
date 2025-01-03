## 코틀린의 핵심 철학
#### 실용주의
- 생산성
- 확장성: 애플리케이션 규모가 커져도, 개발 지용이 급격하게 증가하지 않음
- 유지보수성: 유지보수 굉장히 쉽게 할 수 있음
- 신뢰성: 애플리케이션 예상한 대로 동작하므로 오류가 적다
- 효율성: 애플리케이션이 빠르게 동작하며, 리소스(메모리, 프로세스 등)가 더 적게 필요
## 책의 구성
- #### 좋은 코드
	- 안정적으로 정확한 결과를 만들어 내는 것
	- 가독성
- #### 코드 설계
- #### 효율성
## 1장 안정성
**이번 장의 목적**: 오류가 덜 발생하는 코드를 만드는 것.
- ### [[아이템1 - 가변성을 제한하라]]
- ### [[아이템2 - 변수의 스코프를 최소화하라]]
- ### [[아이템3 - 최대한 플랫폼 타입을 사용하지 말라]]
- ### [[아이템4 - inferred 타입으로 리턴하지 말라]]
- ### [[아이템5 - 예외를 활용해 코드에 제한을 걸어라]]
- ### [[아이템6 - 사용자 정의 오류보단 표준 오류를 사용하라]]
- ### [[아이템7 - 결과 부족이 발생할 경우 null과 Failure를 사용하라]]
- ### [[아이템8 - 적절하게 null을 처리하라]]
- ### [[아이템10 - 단위 테스트를 만들어라]]
## 2장 가독성
- ### [[아이템11 - 가독성을 목표로 설계하라]]
- ### [[아이템12 - 연산자 오버로드를 할 때는 의미에 맞게 사용하라]]
- ### 아이템13 - Unit?을 리턴하지 말라 Boolean을 사용하는 형태로 변경해서 사용하라
- ### 아이템14 - 변수 타입이 명확하지 않은 경우 확실하게 지정하라
		val data = getSomeData() 보단 
		val data: UserData = getSomeData() 가 가독성도 좋다. 
- ### [[아이템15 - 리시버를 명시적으로 참조하라]]
- ### [[아이템16 - 프로퍼티는 동작이 아니라 상태를 나타내야 한다.]]
- ### [[아이템17 - 이름 있는 아규먼트를 사용하라]]
## 3장 재사용성
- ### [[아이템19 - knowlege를 반복하여 사용하지 말라]]
- ### [[아이템20 - 일반적인 알고리즘을 반복해서 구현하지 말라]]
- ### 아이템21 - 일반적인 프로퍼티 패턴은 프로퍼티 위임으로 만들어라
- ### [[아이템22 - 일반적인 알고리즘을 구현할 때 제네릭을 구현하라]]
- ### [[아이템23 - 타입 파라미터의 섀도잉을 피하라]]
- ### [[아이템24 - 제네릭 타입과 variance 한정자를 활용하라]]
- ### [[아이템25 - 공통 모듈을 추출해서 여러 플랫폼에서 재사용하라]]
## 4장 추상화 설계
[[4장 도입부]]
- ### [[아이템26 - 함수 내부의 추상화 레벨을 통일하라]]
- ### [[아이템27 - 변화로부터 코드를 보호하려면 추상화를 사용하라]]
- ### 아이템28 - API 안정성을 확인하라
- ### [[아이템29 - 외부 API 랩(wrap)해서 사용하라]]
- ### [[아이템30 - 요소의 가시성을 최소화하라]]
- ### [[아이템31 - 문서로 규약을 정의하라]]
- ### 아이템32 - 추상화 규약을 지켜라
## 5장 객체 생성
- ### [[아이템33 - 생성자 대신 팩토리 함수를 사용하라]]
- ### [[아이템34 - 기본 생성자에 이름 있는 옵션 아규먼트를 사용하라]]
- ### 아이템35 - 복잡한 객체를 생성하기 위한 DSL을 정의하라
## 6장 클래스 설계
[[6장 도입부]]
- ### [[아이템36 - 상속보다는 컴포지션을 사용하라]]
- ### [[아이템37 - 데이터 집합 표현에 data 한정자를 사용하라]]
- ### [[아이템38 - 연산 또는 액션을 전달할 때는 인터페이스 대신 함수 타입을 사용하라]]
- ### [[아이템39 - 태그 클래스보다는 클래스 계층을 사용하라]]
- ### [[아이템40 - equals의 규약을 지켜라]]
- ### [[아이템41 - hashCode의 규약을 지켜라]]
- ### [[아이템42 - compareTo의 규약을 지켜라]]
- ### [[아이템43 - API의 필수적이지 않는 부분을 확장 함수로 추출하라]]
- ### [[아이템44 - 멤버 확장 함수의 사용을 피하라]]
## 7장 비용 줄이기
- ### [[아이템45 - 불필요한 객체 생성을 피하라]]
- ### [[아이템46 - 함수 타입 파라미터를 갖는 함수에 inline 한정자를 붙여라]]
- ### [[아이템47 - 인라인 클래스의 사용을 고려하라]]
- ### [[아이템48 - 더 이상 사용하지 않는 객체의 레퍼런스를 제거하라]]
## 8장 효율적인 컬렉션 처리
- ### [[아이템49 - 하나 이상의 처리 단계를 가진 경우에는 시퀀스를 사용하라]]
- ### [[아이템50 - 컬렉션 처리 단계 수를 제한하라]]
- ### [[아이템51 - 성능이 중요한 부분에는 기본 자료형 배열을 사용하라]]
- ### [[아이템52 - mutable 컬렉션 사용을 고려하라]]

#effective 