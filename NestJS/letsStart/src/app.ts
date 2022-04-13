import * as express from "express";
import { nextTick } from "process";
import { Cat, CatType } from "./app.model";

const app: express.Express = express();

app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  next();
});

app.get("/cat/0", (req, res, next) => {
  console.log("This is cats id: 0 middleware");
  next();
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send({ cats: Cat });
});

app.get("/cat/0", (req: express.Request, res: express.Response) => {
  res.send({ blue: Cat[0] });
});

app.use((req, res) => {
  console.log("this is error middleware");
  res.send({ error: "404 Not Found error" });
});

app.listen(3000, () => {
  console.log("server is on ...");
});
