> [!info]
> gradle `<Task>` 실행 시 그냥 스크립트가 실행되는 것
> 이 떄 자바 실행 명령어를 찾고, 필요한 매개변수 설정하여 
> 현재 프로세스를 JVM 프로세스로 대체해 JVM(Gradle Client JVM) 을 실행시킨다.

## Gradle Client JVM
매우 가벼운 JVM

- 빌드 로직 수행하지 않는다.
- Gradle Daemon JVM과 통신하여 빌드 처리
- 호환되는 Gradle 데몬이 없는 경우 나중에 데몬이 실행된다.

## --no-daemon 옵션 시
- Gradle Client JVM이 데몬 프로세스 JVM으로 변환 


#gradle 