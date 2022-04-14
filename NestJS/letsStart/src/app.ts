import * as express from "express";
import catsRouter from "./cats/cats.route";

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {
    this.app.use(catsRouter);
  }

  private setMiddleware() {
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[1]);
      next();
    });

    this.app.use(express.json());

    this.setRoute();

    this.app.use((req, res) => {
      console.log("this is error middleware");
      res.send({ error: "404 Not Found error" });
    });
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(3000, () => {
      console.log("server is on ...");
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
