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
