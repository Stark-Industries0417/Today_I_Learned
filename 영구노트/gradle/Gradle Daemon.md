**gradle daemon 도 JVM 이다.**
## Gradle 빌드 단계
### 1. 초기화 단계
- Gradle Client로부터 명령어, 환경 변수, 프로젝트 디렉토리 등의 정보를 받아 빌드 준비
- Gradle 내부에서 사용하는 주요 객체 생성
	- Gradle 객체: 전체 빌드 호출
	- Settings 객체: 프로젝트 계층 구조 설정하기 위해 사용
	- Project 객체: 각 프로젝트를 나타내며 빌드 스크립트에서 상호작용 가능
		- println(name) 이라 하면 실제로는 Project 인스턴스에서 Project.getName() 메서드를 호출하는 것

### 2. 구성 단계: 빌드 스크립트 실행
- 초기화 후 build.gradle or build.gradle.kts 파일 로드 후 실행
```
repositories {
	mavenCentral()
}

위 스크립트는 Closure 인스턴스 생성하고 CLosure 인스턴스를
Project.repositories(Closure) 메서드에 전달한다.
```
- Gradle 데이터 구조 설정
	- 의존성 추가, 플러그인 적용, 태스트 정의 등
- Gradle의 작업 컨테이너 데이터 구조(TaskContainer 클래스)에 작업을 등록하여 필요할 때 
  작업 인스턴스가 생성된다.
### 3. 실행 단계: 선택된 태스크 실행
- 명령어로 전달된 태스크(gradle build)를 기준으로 태스크 결정
- 각 태스크는 코드 조각(Task Action)으로 구성되고 이 코드가 Gradle Daemon JVM에서 실행된다.

특정 작업(테스트 실행)은 별도의 JVM 프로세스 생성하여 실행된다.
- 테스트 코드가 데몬 JVM에 영향 주지 않기 위해
- 병렬 처리 통해 성능 향상 시키기 위해

## 빌드 완료 후
Gradle daemon은 다음을 수행
- 콜백 실행
- 에러 보고 및 로그 출력
- 빌드 스캔 생성
이후 Gradle Client는 데몬과 연결 끊고 종료되며, 데몬은 다음 빌드 처리 위해 대기 상태로 전환된다.

#gradle 