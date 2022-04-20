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

# Nest first project

**interceptor은 서비스의 return 값 데이터를 원하는 형식에 맞게 가공할 때 많이 사용된다.**

DTO 를 클래스로 타이핑하는 이유 => 데코레이터 패턴 적용 가능하고, 상속으로 재사용 할 수 있으므로

## cats.schema.ts

=> mongoDB 저장할 모델

```ts
const options: SchemaOptions = {
  timestamps: true,
};
```

```log
Mongoose: cats.createIndex({ email: 1 }, { unique: true, background: true })
Mongoose: cats.findOne({ email: 'kwon12345@naver.com' }, { projection: { _id: 1 } })
Mongoose: cats.insertOne({ email: 'kwon12345@naver.com', name: 'fefefefef', password: '$2b$10$uZi1Xg2ueUs/J9nFO5gXaOL/SilnfG1c26SG405l2LTlX7TqZnf06', _id: new ObjectId("625fc1646d1f4919ee1c6b37"), __v: 0}, { session: null })

timestamps: true, 옵션으로 mongoose 로그로 만들어진 날짜와 업데이트 날짜를 알 수 있다.
createdAt: new Date("Wed, 20 Apr 2022 08:17:01 GMT"), updatedAt: new Date("Wed, 20 Apr 2022 08:17:01 GMT")
```

```ts
DB에 넣을 데이터가 필수이고, 유니크 해야 함을 명시
@Prop({
    required: true,
    unique: true,
  })

Dto와 swagger를 위한 데코레이터
swagger API 명세서에 요청으로 필요한 데이터 예시를 보여줌
@ApiProperty({
    example: 'kwon@naver.com',
    description: 'email',
    required: true,
  })
```

## cats.request.dto.ts

```ts
export class CatRequestDto extends PickType(Cat, [
  "email",
  "name",
  "password",
] as const) {}

DTO: 데이터 송수신에 규격을 정하는 것(데이터 타입을 바꾼다던지 등)
재사용성을 위해 Cat 스키마에서 상속받는다.
PickType(Cat, [필요 스키마]) 로 요청시 받을 데이터를 정함
```

```ts
@ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 201,
    description: 'success create',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

스웨거로 응답 예시를 보여주기 위해 @ApiResponse 데코레이터 사용
프로퍼티로 응답 객체의 타입 지정해 줄 수 있다.

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '328012',
    description: 'id',
  })
  id: string;
}
```

## CORS 설정

```ts
app.enableCors({
  origin: true, // 어디서든 접근가능 배포시엔 프론트 url로 지정해야 한다.
  credentials: true,
});
```

## Repository 패턴과 레이어 분리 => 스프링의 DAO

여러 모듈중 한 모듈이 데이터베이스에서 데이터를 가져온 상황에 서로 모듈끼리 데이터를 참조하는 상황이 생길 수 있다. => 순환 참조가 될 수 있다.
서비스와 데이터베이스 사이에 미들웨어 마냥 DB에 직접 접근하는 계층을 만들어 모든 서비스 모듈들이 이 게층을 참조하도록 하는 것
다양한 데이터베이스(Mysq, mongoDB 등)이 있을 때 레포지토리 패턴이 없다면 각 모듈에서 다양한 DB 쿼리를 작성해야 하지만
레포지토리 패턴으로 재사용성도 높일 수 있다.

## JWT 로그인

jwt.guard.ts에서 상속해주는 AuthGuard 클래스는 strategy를 자동으로 실행해주는 기능이 있다.

```ts
auth.module.ts

PassportModule.register({ defaultStrategy: 'jwt', session: false }), // 세션 쿠키 사용하지 않을 것이므로 false
```

auth.module.ts

```ts
forwardRef(() => CatsModule),

cats 모듈과 auth 모듈이 서로를 참조하고 있다.
순환 참조를 해결하기위해 forwardRef 함수 사용
```

## JWT(Json Web Token)

- 인증 절차를 거쳐 서버에서 JWT 발급해주면, 클라이언트는 이를 보관하고 있다가 API 등을 사용할 때에 서버에 JWT를 함께 제출하며 서버로부터 인증받는다.
- JWT는 해시 혹은 비대칭키 방식 사용하여 서명한다. => 무결성 검증할 수 있다는 특징
- 토큰 자신이 정보를 직접 포함하고 있다 => 통신 양자간 정보를 안전하게 전송할 수 있음

### 서버기반 인증

- 성공적 로그인 이후 서버에서 사용자에 대한 세션 생성
- 사용자의 브라우저에 세션 ID 저장하는 쿠기 생성, 서버는 이 세션 ID 통해 사용자 식별하고 사용자에 대한 정보 저장, 관리함
- 수평적으로 서버를 확장했을때 서버끼리 데이터가 일치하지 않을 수 있다. => 모든 서버 컴퓨터에 유저의 세션 ID를 공유해야 함

### 토큰기반 인증

- 유저 정보를 서버에 저장하지 않음
- 서버가 발급해준 토큰을 클라이언트는 저장하고 추후에 서버에 요청 시 HTTP header에 실어 전송한다.
- 서버는 이를 검증한다.
- 유저 상태의 저장 책임이 서버 -> 클라이언트로 이동

### JWT의 구조

- 토큰은 헤더, 페이로드 서명 세 부분으로 구성, 각 구성요소는 점으로 분리된다.
- 한줄로 나타내기 위해 최종적으로는 각 구성요소를 Base64로 인코딩한다.

#### 헤더

- 토큰의 유형과 암호화 알고리즘 두 가지 정보를 JSON 형태로 담고 있음

```JSON
{
  "alg": "HS256", // 암호화 알고리즘 주로 HMAC SHA256 또는 RSA 가 사용됨
  "typ": "JWT",
}
```

#### 페이로드(Payload)

- 사용자의 정보 혹은 데이터 속성 등을 나타내는 클레임 이라는 정보 단위로 구성

##### 등록된 클레임

- iss : Issuer. 토큰 발급자를 나타낸다.
- sub : Subject. 토큰 제목을 나타낸다.
- aud : Audience. 토큰 대상자를 나타낸다.
- exp : Expiration Time. 토큰 만료 시각을 나타낸다. Numeric Date 형식으로 나타낸다.
- nbf : Not Before. 토큰의 활성 시각을 나타낸다. 쉽게 말해, 이 시각 전에는 토큰이 유효하지 않다는 의미이다. Numeric Date 형식으로 나타낸다.
- iat : Issued At. 토큰이 발급된 시각을 나타낸다. Numeric Date 형식으로 나타낸다. 이 값으로 토큰이 발급된지 얼마나 오래됐는지 확인할 수 있다.
- jti JWT ID. JWT 의 식별자를 나타낸다.

##### 공개 클레임(public claim)

- JWT 사용하는 사람들에 의해 정의되는 클레임, 충돌 방지 위해 URI 형태로 이름 짓거나, 직접 클레임 등록한다

##### 비공개 클레임(Private claim)

- 서버와 클라이언트 사이에서만 협의된 클레임 => 공개 클레임과 충돌이 일어나지 않게 사용하면 됨

#### 서명(Signature)

- 특정 암호화 알고리즘 사용하여, Base64 인코딩된 헤더와 Base64 인코딩된 페이로드 비밀키를 이용하여 암호화한다.
- 서명 통해 헤더 혹은 페이로드가 누군가에 의해 변조되었는지 그 무결성 검증하고 보장할 수 있음

## jwt.strategy.ts => 인증을 할때 사용되는 것

## auth.module.ts

JwtModule는 JWT 토큰을 만들어주는 모듈이다.

## jwt.guard 에서 어떻게 jwt.strategy 클래스를 찾아내서 실행시키는지

1. auth 모듈에서 providers 로 JwtStrategy 를 등록
2. JwtAuthGuard는 @nestjs/passport 로직에 의해 PassportStrategy 를 상속받은 전략 클래스인 JwtStrategy를 찾음

JwtRegister 의 secret키는 jwt 토큰을 인코딩 할때 사용
JwtStrategy 의 secret키는 jwt 토큰을 디코딩(인증) 할때 사용

## Cats 모듈과 Auth 모듈이 서로를 참조할 때 providers에 명시하지 않고 전체를 import 하는 이유

1. 각 모듈간의 의존성을 한 눈에 확인 가능
2. 모듈의 캡슐화로 어떤 provider가 export 되는지도 확인 가능
