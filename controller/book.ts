import { Request, Response } from "express";
import { AppDataSource } from "..";
import { Book } from "../model/libraryEntity";

export const bookList = async (req: Request, res: Response) => {
  try {
    const book = await AppDataSource.getRepository(Book)
      .createQueryBuilder("book")
      .innerJoinAndSelect("book.author", "author")
      .innerJoinAndSelect("book.user", "user")
      .innerJoinAndSelect("book.bookStatus", "book_status")
      .getMany();
    res.json({ responseCode: 100, message: "İşlem başarılı", book });
  } catch (error) {
    res.json({ responseCode: -300, message: "işlem başarısız" });
  }
};

export const insertBook = async (req: Request, res: Response) => {
  try {
    const { bookName, authorId, userId, bookStatusId } = req.body;
    const book = new Book();
    book.name = bookName;
    book.author = authorId;
    book.user = userId;
    book.bookStatus = bookStatusId;
    await AppDataSource.manager.save(book);
    console.log("Book has been saved. Book id is", book.id);
    res.json({ responseCode: 100, message: "İşlem başarılı" });
  } catch (error) {
    res.json({ responseCode: -300, message: "işlem başarısız" });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId, bookname, authorId, userId, bookStatusId } = req.body;
    const bookRepository = AppDataSource.getRepository(Book);
    const bookToUpdate = await bookRepository.findOneBy({
      id: bookId,
    });
    bookToUpdate.name = bookname;
    bookToUpdate.author = authorId;
    bookToUpdate.user = userId;
    bookToUpdate.bookStatus = bookStatusId;
    await bookRepository.save(bookToUpdate);
    res.json({ responseCode: 100, message: "İşlem başarılı" });
  } catch (error) {
    res.json({ responseCode: -300, message: "işlem başarısız" });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.body;
    const bookRepository = AppDataSource.getRepository(Book);
    const bookToRemove = await bookRepository.findOneBy({
      id: bookId,
    });
    await bookRepository.remove(bookToRemove);
    res.json({ responseCode: 100, message: "İşlem başarılı" });
  } catch (error) {
    res.json({ responseCode: -300, message: "işlem başarısız" });
  }
};
