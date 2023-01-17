import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "..";
import { Book } from "../model/libraryEntity";

export const bookNameAndAuthor = async (req: Request, res: Response, next: NextFunction) => {
  const { bookName, author } = req.body;

  const bookRepository = AppDataSource.getRepository(Book);
  const checkExistBook = await bookRepository.findOneBy({
    name: bookName,
    author: author,
  });
  if (checkExistBook) {
    return res.json({
      responseCode: -300,
      message: "Aynı isime sahip kitap ve yazar olamaz",
    });
  } else {
    return next();
  }
};
