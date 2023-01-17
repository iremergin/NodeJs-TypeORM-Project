import { Request, Response } from "express";
import { AppDataSource } from "..";
import { User } from "../model/libraryEntity";

export const Register = async (req: Request, res: Response) => {
  try {
    const { userTckNo, userName, userSurname, userPhone, userEmail } = req.body;
    const user = new User();
    user.tckNo = userTckNo;
    user.name = userName;
    user.surname = userSurname;
    user.phone = userPhone;
    user.email = userEmail;
    await AppDataSource.manager.save(user);
    console.log("User has been saved. User id is", user.id);
    res.json({ responseCode: 100, message: "İşlem başarılı" });
  } catch (error) {
    res.json({ responseCode: -300, message: "işlem başarısız" });
  }
};
