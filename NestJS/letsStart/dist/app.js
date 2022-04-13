"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_model_1 = require("./app.model");
var app = express();
app.use(function (req, res, next) {
    console.log(req.rawHeaders[1]);
    next();
});
app.use(express.json());
app.get("/cat", function (req, res) {
    try {
        var cats = app_model_1.Cat;
        res.status(200).send({
            success: true,
            data: {
                cats: cats,
            },
        });
    }
    catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});
app.get("/cat/:id", function (req, res) {
    try {
        var params_1 = req.params;
        var cat = app_model_1.Cat.find(function (cat) {
            return cat.id === params_1.id;
        });
        res.status(200).send({
            success: true,
            data: {
                cat: cat,
            },
        });
    }
    catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});
app.post("/cat", function (req, res) {
    try {
        var data = req.body;
        app_model_1.Cat.push(data);
        res.status(200).send({
            success: true,
            data: { data: data },
        });
    }
    catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});
app.use(function (req, res) {
    console.log("this is error middleware");
    res.send({ error: "404 Not Found error" });
});
app.listen(3000, function () {
    console.log("server is on ...");
});
//# sourceMappingURL=app.js.map