import { Cat, CatType } from "./cats.model";
import { Request, Response } from "express";

export const readAllcat = (req: Request, res: Response) => {
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
};

export const readCat = (req: Request, res: Response) => {
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
};

export const createCat = (req: Request, res: Response) => {
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
};

export const updateCat = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const body = req.body;
    let result;
    Cat.forEach((cat) => {
      if (cat.id === params.id) {
        cat = body;
        result = cat;
      }
    });
    res.status(200).send({
      success: true,
      data: {
        cat: result,
      },
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

export const updatePartialCat = (req: Request, res: Response) => {
  try {
    const param = req.params;
    const body = req.body;
    let result;
    Cat.forEach((cat) => {
      if (cat.id === param.id) {
        cat = { ...cat, ...body };
        result = cat;
      }
    });
    res.status(200).send({
      success: true,
      data: {
        cat: result,
      },
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

export const deleteCat = (req: Request, res: Response) => {
  try {
    const param = req.params;
    const newCat = Cat.filter((cat) => cat.id !== param.id);
    res.status(200).send({
      success: true,
      data: newCat,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};
