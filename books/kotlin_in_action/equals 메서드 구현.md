###  2023-12-26 15:51
### 주제 kotlin equals

----
### 메모
equals 함수엔 override 붙어있음
다른 연산자 오버로딩 관례와 달리 equals는 Any에 정의된 메서드이므로 override가 필요
Any의 equals에는 operator가 붙어 있지만 그 메서드를 오버라이드하는 메서드 앞에는 operator 변경자를 붙이지 않아도 자동으로 상위 클래스의 operator 지정이 적용된다.
### 출처
kotlin in action - 리스트 7.7 equals 메서드 구현하기 317.p
### 연결문서
[[!= 호출]]
#kotlin
