import jwt from "jsonwebtoken";

import express from "express";
import { response } from "../common/response";

export const verifyAccount = (
  req: express.Request | any,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.header("Authorization");

  const token = `${authHeader && authHeader.split(" ")[1]}`;

  if (!token) {
    res.status(401).json(response(false, "Access token not found!"));
  } else {
    try {
      const decoding = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
      req.userData = decoding;
      next();
    } catch (error) {
      res.status(403).json(response(false, "Invaild token"));
    }
  }
};
