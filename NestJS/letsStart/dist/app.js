"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_model_1 = require("./app.model");
var app = express();
app.use(function (req, res, next) {
    console.log(req.rawHeaders[1]);
    next();
});
app.get("/cat/0", function (req, res, next) {
    console.log("This is cats id: 0 middleware");
    next();
});
app.get("/", function (req, res) {
    res.send({ cats: app_model_1.Cat });
});
app.get("/cat/0", function (req, res) {
    res.send({ blue: app_model_1.Cat[0] });
});
app.use(function (req, res) {
    console.log("this is error middleware");
    res.send({ error: "404 Not Found error" });
});
app.listen(3000, function () {
    console.log("server is on ...");
});
//# sourceMappingURL=app.js.map