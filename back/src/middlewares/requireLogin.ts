import { Response } from "express";

export const requireLogin = (req: any, res: Response, next: any) => {
  if (!req.user) {
    return res.status(401).send({ error: "You must log in!" });
  }

  next();
};
