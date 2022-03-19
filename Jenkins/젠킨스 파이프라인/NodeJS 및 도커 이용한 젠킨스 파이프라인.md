# NodeJS 및 도커 이용한 젠킨스 파이프라인

[https://github.com/wardviaene/docker-demo](https://github.com/wardviaene/docker-demo)

깃 저장소에 프로젝트랑 프로젝트의 파이프라인 코드를 저장되 있어야 함

```python
node {   # 모든 노드에서 구축 가능
   def commit_id
   stage('Preparation') { # 준비 단계
     checkout scm   # 젠킨스에서 해당 깃 저장소 주소 복제

			# git rev-parse --short HEAD 를 통해 커밋 ID를 알아내고
			# .git/commit-id 파일에 커밋 ID 저장, # 이미지 태그에 사용됨
     sh "git rev-parse --short HEAD > .git/commit-id"  
			# .git/commit-id 파일 읽기, trim()은 공백 자르거나 반환해줌                      
     commit_id = readFile('.git/commit-id').trim()
   }
   stage('test') {   # 테스트 단계
			# nodeJSInstallationName: 'nodejs' 으로 nodejs를 복제하고
			# 이 nodejs를 사용할 때만 npm 커맨드 사용 가능
     nodejs(nodeJSInstallationName: 'nodejs') {

				# npm test 에서만 npm 설치 진행
				# 'npm install --only=dev' : 개발 패키지 설치
       sh 'npm install --only=dev'

				# 패키지에 설정한 대로 scripts 부분에 test를 지정하여 test 코드가 담긴 파일 실행
       sh 'npm test'
     }
   }
   stage('docker build/push') {   # 도커 구축 및 푸시 단계
			
     docker.withRegistry('https://index.docker.io/v2/', 'dockerhub') {
				# commit_id 로 이미지 태그 지정
				# 도커 허브에 이미지 푸시
       def app = docker.build("wardviaene/docker-nodejs-demo:${commit_id}", '.').push()
     }
   }
}
```

## 젠킨스 UI로 파이프라인 생성

<aside>
💡 젠킨스 UI로 파이프라인 생성의 장점: 저장소와 함께 번들로 묶을 수 있어 코드 관리 용이

</aside>

new item에서 item name을 nodejs docker pipeline으로 설정하고

유형을 파이프라인 으로 선택 

Pipeline 부분에

Pipeline script from SCM 선택하고

SCM 은 깃 선택하고 프로젝트 깃 저장소 주소 저장 ex) [https://github.com/wardviaene/docker-demo](https://github.com/wardviaene/docker-demo).git

script Path 부분에 젠킨스 파일 경로 지정

저장 > build now 

> 젠킨스 파이프라인은 젠킨스 관리자, 시스템 운영, 개발의 부담을 덜어준다 또한 
개발자는 작업에 대한 소유권을 갖고 협업하며 기록과 감사 기록을 보유할 수 있게 하며
변경 사항을 확인하고 모든것을 코드로 처리가 가능!
> 

[도커 파이프라인 플러그인을 이용한 파이프라인 구축](NodeJS%20%E1%84%86%E1%85%B5%E1%86%BE%20a9771/%E1%84%83%E1%85%A9%E1%84%8F%E1%85%A5%20%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%91%2042d12.md)