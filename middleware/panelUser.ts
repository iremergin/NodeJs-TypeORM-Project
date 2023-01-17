import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "..";
import { PanelUser } from "../model/libraryEntity";

export const loginControl = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const panelUserRepository = AppDataSource.getRepository(PanelUser);
  const checkExistUser = await panelUserRepository.findOneBy({
    email: email,
    password: password,
  });
  if (!checkExistUser) {
    return res.json({ responseCode: -300, message: "Kullanıcı Kayıtlı Değil" });
  } else {
    return next();
  }
};
