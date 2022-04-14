import { Cat, CatType } from "./cats.model";
import { Router } from "express";
import {
  createCat,
  deleteCat,
  readAllcat,
  readCat,
  updateCat,
  updatePartialCat,
} from "./cats.service";

const router = Router();

router.get("/cat", readAllcat);
router.get("/cat/:id", readCat);
router.post("/cat", createCat);
router.put("/cat/:id", updateCat);
router.patch("/cat/:id", updatePartialCat);
router.delete("/cat/:id", deleteCat);

export default router;
