import * as express from "express";
import catsRouter from "./cats/cats.route";

const app: express.Express = express();

app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  next();
});

app.use(express.json());

app.use(catsRouter);

app.use((req, res) => {
  console.log("this is error middleware");
  res.send({ error: "404 Not Found error" });
});

app.listen(3000, () => {
  console.log("server is on ...");
});
