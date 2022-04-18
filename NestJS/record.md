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

> 싱글톤 패턴: 하나의 클래스에서 하나의 인스턴스만 사용하는 것(서버 실행과 같이 딱 한번 사용됨을 보장 받아야 하는 경우 사용해야한다.)
> 메모리 효율 측면에서도 장점

##### 데코레이터: 클래스나 함수에 기능을 첨가시켜 주는 것 => 재사용성 극대화

데코레이터는 다른 함수를 인수로 취하여 기능이 추가된 동일한 함수를 반환하는 함수이다.
클래스, 메서드 또는 속성에 대해 정의할 수 있다.

```json
nestJS 안에서 동작하는 라이브러리
"@nestjs/common": "^8.0.0",
"@nestjs/core": "^8.0.0",
"@nestjs/platform-express": "^8.0.0",

데코레이터에 사용되는 라이브러리
"reflect-metadata": "^0.1.13",

rm -rf 옵션 사용가능하게 만들어줌
"rimraf": "^3.0.2",

비동기 및 이벤트 기반 프로그래밍 작성 위한 라이브러리
"rxjs": "^7.2.0"
```

**interceptor은 서비스의 return 값 데이터를 원하는 형식에 맞게 가공할 때 많이 사용된다.**
