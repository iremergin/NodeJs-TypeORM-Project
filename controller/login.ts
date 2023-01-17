import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const signJwt = (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const payLoad = {
      email,
      password,
    };
    const token = jwt.sign(payLoad, req.app.get("api_secret_key"), {
      expiresIn: "1h",
    });
    res.json({ responseCode: 100, message: "İşlem başarılı", token: token });
  } catch (error) {
    res.json({ responseCode: -300, message: "işlem başarısız" });
  }
};
