app.module.ts

```typescript
모든것의 루트 모듈
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

app.controller.ts

```typescript
# url 을 가져오고 함수 실행
# express의 라우터 같은 존재

import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

nestJS 는 controller 로직과 비즈니스 로직 구분하고 싶어한다.
=> app.Service 메소드를 통해 비즈니스 구축

### 컨트롤러 생성

```terminal
nest g co
```

### DTO(Data Transfer Object)

> 전송되는 데이터 객체 타입을 제한하는 방법

```javascript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  })
);
```

- whitelist: true -> validation decorator(IsString, IsNumber etc)를 사용하지 않는 속성을 제거한다.

```javscript
# 클라이언트 측에서 전송한 데이터
{
  "title": "Tenet",
  "year": 2020,
  "genres":["Actioin, "Sci-FI"],
  "hack": "by me"    // 유효성 데코레이터가 없는 속성
}

whitelist: true -> hack 속성 제거된 객체 반환

{
  "title": "Tenet",
  "year": 2020,
  "genres":["Actioin, "Sci-FI"],
}
```

- forbidNonWhitelisted: true

```javascript
클라이언트 측에서 전송한 데이터
{
  "title": "Tenet",
  "year": 2020,
  "genres": ["Action", "Sci-Fi"],
  "hack": "by me"
}

"hack" 이라는 속성은 화이트리스트에 존재하지 않으므로 HttpException 반환

response :
{
　 "statusCode": 400,
　 "message": [ "property hack should not exist" ],
　 "error": "Bad Request"
}
```

> forbidNonWhitelisted 옵션은 whitelist에서 유효한 속성이 아닌 속성이 있다면 HttpException 응답을 하므로 whitelist 에 true 옵션을 주어야 사용 가능한 옵션이다.

- transform: true -> 전송된 객체의 타입을 지정한 타입으로 자동 변경해주는 옵션

<hr>

npm i @nestjs/mapped-types -> PartialType 모듈 인스톨

```javascript
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
```

=> UpdateMovieDto 의 기반은 CreateMovieDto로 두고 필수적이지 않게 해주는 옵션

<hr>

NestJS 앱은 여러 개의 모듈로 구성되는데 app.module.ts 파일은 AppService 와 AppController 만 가져야 한다.
=> MoviesService, MoviesController, movies.module 분리

nest g mo => movies module install
app 모듈은 전체 모듈을 관장하는 파일

```typescript
@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
```

providers 로 MoviesService 를 import 하는 덕분에 MoviesService 타입을 추가하는 것만으로도 작동이 되는 것이다.
=> NestJS가 MoviesService import -> Controller에 inject(주입) 한다. 그래서 MoviesService 에 Injectable decorator 가 있다.
