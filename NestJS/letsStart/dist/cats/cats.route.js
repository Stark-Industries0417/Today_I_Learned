"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cats_service_1 = require("./cats.service");
var router = express_1.Router();
router.get("/cat", cats_service_1.readAllcat);
router.get("/cat/:id", cats_service_1.readCat);
router.post("/cat", cats_service_1.createCat);
router.put("/cat/:id", cats_service_1.updateCat);
router.patch("/cat/:id", cats_service_1.updatePartialCat);
router.delete("/cat/:id", cats_service_1.deleteCat);
exports.default = router;
//# sourceMappingURL=cats.route.js.map