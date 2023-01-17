import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "..";
import { User } from "../model/libraryEntity";

export const userName = async (req: Request, res: Response, next: NextFunction) => {
    const {userTckNo } = req.body;

  const userRepository = AppDataSource.getRepository(User);
  const checkExistUser = await userRepository.findOneBy({
    tckNo: userTckNo
  });
  if (checkExistUser) {
    return res.json({ responseCode: -300, message: "Kullanıcı Kayıtlı" });
  } else {
    return next();
  }
};
