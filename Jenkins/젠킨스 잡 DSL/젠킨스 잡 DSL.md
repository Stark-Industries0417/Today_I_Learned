# 젠킨스 잡 DSL

<aside>
💡 젠킨스 잡 DSL(Domain Specific Language) 이란?
최소한의 작업만으로 프로그래밍 방식으로 작업을 정의하는 젠킨스 플러그인
작업의 규모가 커지고 유지가 어려워 지면서 많은 작업이 필요할 때 사용

</aside>

- 버전 관리 기능
- 내역, 감사 기록 사용
- 문제 발생 시 쉽게 작업 복구 가능

## Groovy(자바 플랫폼용 스크립트 언어)

```python
# groovy syntax

job('DSL example') {    // job 이름 설정
scm {        // 버전관리 프로젝트 깃 저장소
git('https://github.com/NilukaSripalim/ui-scenario-test.git') {  node ->
      // is hudson.plugins.git.GitSCM
  node / gitConfigName('내 깃 이름')
  node / gitConfigEmail('이메일 주소')
    }
}
triggers { // 몇 번이나 구축할지(scm 을 5분마다 가져오는것) 변경사항 있을 시 Nodejs 다시 구축 하면 됨
  scm('H/5 * * * *')
}
wrappers { // Nodejs 가 필요하다고 입력, wrapper 정의되 있지 않으면 커맨드 노드 또는 커맨드 Npm을 사용할 수 없음
nodejs('nodejs 설치이름')
// this is the name of the NodeJS installation in
// Manage Jenkins -> Configure Tools -> NodeJS Installations -> Name    }
steps {
shell("npm install")  // npm 설치 명령 수행
  }
}
```

해당 코드로 작업 하나 생성 가능
