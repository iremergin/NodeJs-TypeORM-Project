import { Request, Response } from "express";
import { AppDataSource } from "..";
import { User } from "../model/libraryEntity";

export const userList = async (req: Request, res: Response) => {
    try {
      const user = await AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .select("user")
        .getMany();
      res.json({ responseCode: 100, message: "İşlem başarılı", userList: user });
    } catch (error) {
      res.json({ responseCode: -300, message: "işlem başarısız" });
    }
  };


  export const updateUser = async (req: Request, res: Response) => {
    try {
      const { userTckNo, userId, userName, userSurname, userPhone, userEmail } = req.body;
      const userRepository = AppDataSource.getRepository(User);
      const userToUpdate = await userRepository.findOneBy({
        id: userId,
      });
      userToUpdate.tckNo =  userTckNo;
      userToUpdate.name = userName;
      userToUpdate.surname = userSurname;
      userToUpdate.phone = userPhone;
      userToUpdate.email = userEmail;
      await userRepository.save(userToUpdate);
      res.json({ responseCode: 100, message: "İşlem başarılı" });
    } catch (error) {
      res.json({ responseCode: -300, message: "işlem başarısız" });
    }
  };

  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      const userRepository = AppDataSource.getRepository(User);
      const userToRemove = await userRepository.findOneBy({
        id: userId,
      });
      await userRepository.remove(userToRemove);
      res.json({ responseCode: 100, message: "İşlem başarılı" });
    } catch (error) {
      res.json({ responseCode: -300, message: "işlem başarısız" });
    }
  };