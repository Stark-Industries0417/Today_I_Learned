```json
{
  "scripts": {
    "build": "tsc",
    "start:dev": "tsc-watch --onSuccess \"node dist/app.js\"",
    "prestart": "npm run build",
    "start": "node dist/app.js"
  },
  "devDependencies": {
    javascript 런타임의 타입 가져옴
    "@types/node": "^15.3.0",
    "prettier": "^2.2.1",
    typescript 컴파일러
    "tsc": "^2.0.3",
    "tsc-watch": "^4.2.9",
    "typescript": "^4.3.4"
  },
  "dependencies": {
    "express": "^4.17.3"
  }
}
```

**devDependencies 와 dependencies 의 차이**

- devDependencies 개발에 필요한 라이브러리 들을 명시하는 곳이고
- dependencies 는 프로덕션 서버에 실행할 때 사용한 기술 명시

##### npm run start:dev 명령

1. tsc-watch 로 컴파일
2. tsconfig.json에서 설정해둔 컴파일 옵션대로 dist 폴더 생성
3. dist 폴더에 typescipt를 컴파일 해서 나온 javascript 파일 생성
4. dist폴더에 생성된 javascript 파일을 노드로 실행 node dist/app.js

##### npm run start

1. prestart 옵션으로 인해 npm run build 먼저 실행
   npm run build 의 tsc 옵션은 루트경로의 tsconfig.json 읽고 옵션에 맞게 컴파일 진행
2. node dist/app.js 실행

express 위에서 typescript 사용하기 위해 @type/express 설치
어차피 프로덕션 서버에서는 컴파일된 결과인 자바스크립트만 실행할 것이기 때문에 @type/express -D 옵션으로 devDependencies에다 명시한다.

<hr>

express 는 json 미들웨어 없이는 request 의 body를 읽어 낼 수 없다.
