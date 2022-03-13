# NodeJS 애플리케이션을 이용한 젠킨스 잡 DSL

1. 젠킨스 job dsl 플러그인 설치
2. seed project 생성(자유 형식)
3. 소스코드 관리 부분에 dsl 스크립트 가져올 깃 저장소 입력
4. Process JOB DSLs 로 구축 단계 설정
5. 파싱하고자 하는 스크립트 입력 ⇒ 깃헙에서 제안된 스트림의 스크립트와 연결
6. 젠킨스 관리 → In-process script approval에서 스크립트 승인

NodeJS 프로젝트 생성 완료

NodeJS 프로젝트 빌드

### 터미널에서 작동하는지 확인

1. docker exec -it 젠킨스 컨테이너 id bash
2. var/jenkins_home/workspace/NodeJS 에 모두 설치 되있음
3. npm start 불가 ⇒ find ~ -name ‘npm’ 으로 Npm 찾기
4. 경로 내보내기 : export PATH=$PATH:/var/jenkins_home/toosl/jenkins.plugins.nodejs.tools.NodeJSInstallation/nodejs/bin

<aside>
💡 환경변수 $PATH 설정 이유
사용하고자 하는 명령들을 전체 경로를 적거나 혹은 해당 디렉터리에 들어가 실행하는 번거로움을 없애 작업 생산성 높이기 위함

</aside>