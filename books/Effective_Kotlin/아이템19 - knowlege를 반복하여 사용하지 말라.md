> [!info] 프로젝트에서 이미 있던 코드를 복붙하고 있다면 무언가가 잘못된 것이다.

> [!info] Knowledge - 프로젝트를 진행할 때 정의한 모든 것.

### 프로그램에서 중요한 knowledge 두 가지
1. 로직: 프로그램이 어떤 식으로 동작하는지와 프로그램이 어떻게 보이는지
2. 공통 알고리즘: 원하는 동작을 하기 위한 알고리즘 
> [!important] 프로그램이 변화할 때 가장 큰 적은 knowledge가 반복되어 있는 부분이다.

> [!info] 두 코드가 같은 knowledge를 나타내는지, 다른 knowledge를 나타내는 지는 함께 변경될 가능성이 높은가? 따로 변경될 가능성이 높은가? 라는 질문으로 결정할 수 있다.

## 단일 책임 원칙
> 코드를 추출해도 되는지 확인할 수 있는 원칙이다.

> [!example]
장학금 부서와 인증 관련 부서에서 Student 클래스를 모두 사용하고 있을 때
두 부서에서 Student라는 클래스에 다음 두 가지 프로퍼티를 추가했다.
- qualifiesForScholarship: 장학금 부서에서 만든 프로퍼티로 학생이 장학금 받을 수 있는 포인트를 갖고 있는지 나타냄
- isPassing은 인증 부서에서 만든 프로퍼티로 학생이 인증 통과했는지 나타냄
두 프로퍼티는 모두 학생의 이전 학기 성적을 기반으로 계산된다.
그래서 두 프로퍼티를 한꺼번에 계산하는 calculatePointsFromPassedCourses 함수를 만듬

``` kotlin
class Student {
	fun isPassing(): Boolean = 
		calculatePointsFromPassedCourses() > 15

	fun qualifiesForScholarship(): Boolean = 
		calculatePointsFromPassedCourses() > 30

	private fun calculatePointsFromPassedCourses(): Int {
		//...
	}
}
```
위 같은 상황에 학부장이 덜 중요한 과목은 장학금 포인트를 줄여달라 요청해서 규칙을 바꿔야 하는 상황이 생기게 되었다.

개발자가 qualifiesForScholarship 프로퍼티를 보고 calculatePointsFromPassedCourses에서 이 값을 수정하고 있다는 것을 알고 요청사항에 맞게 수정했다. 
isPassing 도 비슷한 프로퍼티라 생각해서 이 관련된 동작도 수정했다.
=> 이렇게 되면 인증을 통과할 줄 알았던 학생이 통과하지 못할 수도 있다.

> [!tip] 개발자는 calculatePointsFromPassedCourses 함수가 자신이 해야 하는 일 이외의 책임을 갖고 있을 거라는 것을 예측하지 못 한것이다.
**관습적으로 private 함수가 두 가지 이상의 역할을 하지 않는다.**

### 해결책: 처음부터 책임에 따라 다른 클래스로 구분해서 만들어야 했다.
- StudentIsPassingValidator 와 StudentQualifiesForScholarshipValidator 클래스로 구분해서 만든다.
- 코틀린 확장 함수를 활용해, 두 함수를 Student 클래스 아래에 두면서도 각각의 부서가 관리하는 서로 다른 모듈 파일에 배치할 수 있다.
``` kotlin
// accreditations 모듈
fun Student.qualifiesForScholarship(): Boolean {
	/*..*/
}

// scholarship 모듈
fun Student.calculatePointsFromPassedCourses(): Boolean {
	/*..*/
}
```

### 헬퍼 함수를 만드는 방법
1. 두 부서에서 모두 사용하는 일반적인 public 함수로 헬퍼 함수를 만들어 공통 부분은 두 부서에서 모두 사용하고, 이를 함부로 수정해선 안 되게 규약을 정한다.
2. 헬퍼 함수를 각가의 부서 모듈에 따라 2개 만든다.

> [!info] 단일 책임 원칙의 두 가지 사실
> - 서로 다른 곳에서 사용하는 knowledge는 독립적으로 변경할 가능성이 많다. 비슷한 처리를 해도 완전히 다른 knowledge로 취급하는 것이 좋다.
> - 다른 knowledge는 분리해 두는 것이 좋다. 그렇지 않으면, 재사용해서는 안 되는 부분을 재사용하려는 유혹이 발생할 수 있다.

#effective 