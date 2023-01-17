import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "..";
import { Publisher, User } from "../model/libraryEntity";

export const publisherName = async (req: Request, res: Response, next: NextFunction) => {
    const {publisherName } = req.body;

  const publisherRepository = AppDataSource.getRepository(Publisher);
  const checkExistPublisher = await publisherRepository.findOneBy({
    name: publisherName
  });
  if (checkExistPublisher) {
    return res.json({ responseCode: -300, message: "Aynı isimde yayınevi olamaz" });
  } else {
    return next();
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    if (!(email && password)) {
      res.json({ responseCode: -300, message: "kullanıcı bulunamadı" });
    }

    let user: User;

    user = await userRepository.findOne({ where: { email: email } });

    if (!user) {
      res.json({ responseCode: -300, message: "Yanlış email veya şifre" });
      return;
    }
  } catch (error) {
    res.json({ responseCode: -300, message: "işlem başarısız" });
  }
};