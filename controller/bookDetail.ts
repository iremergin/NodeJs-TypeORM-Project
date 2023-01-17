import { Request, Response } from "express";
import { AppDataSource } from "..";
import { Book, BookDetail } from "../model/libraryEntity";

export const bookDetailList = async (req: Request, res: Response) => {
  try {
    const bookId  = req.body;
    const book = await AppDataSource.getRepository(Book)
      .createQueryBuilder("book")
      .select("book")
      .where("book.id = :id", { id: bookId })
      .getMany();
    const bookDetail = await AppDataSource.getRepository(BookDetail)
      .createQueryBuilder("bookDetail")
      .select("bookDetail")
      .where("bookdetail.bookId = :id", { id: bookId })
      .getMany();
    res.json({
      responseCode: 100,
      message: "İşlem başarılı",
      book: book[0],
      bookDetail: bookDetail[0],
    });
  } catch (error) {
    res.json({ responseCode: -300, message: "işlem başarısız" });
  }
};
