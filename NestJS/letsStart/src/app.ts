import * as express from "express";
import { nextTick } from "process";
import { Cat, CatType } from "./app.model";

const app: express.Express = express();

app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  next();
});

app.use(express.json());

app.get("/cat", (req, res) => {
  try {
    const cats = Cat;
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

app.get("/cat/:id", (req, res) => {
  try {
    const params = req.params;
    const cat = Cat.find((cat) => {
      return cat.id === params.id;
    });
    res.status(200).send({
      success: true,
      data: {
        cat,
      },
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

app.post("/cat", (req, res) => {
  try {
    const data = req.body;
    Cat.push(data);
    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

app.use((req, res) => {
  console.log("this is error middleware");
  res.send({ error: "404 Not Found error" });
});

app.listen(3000, () => {
  console.log("server is on ...");
});
