import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger();
  use(req: any, res: any, next: () => void) {
    res.on('finish', () => {
      this.logger.log(
        `${req.ip} ${req.method} ${req.statusCode}`,
        req.originalUrl,
      );
    });
    next();
  }
}
