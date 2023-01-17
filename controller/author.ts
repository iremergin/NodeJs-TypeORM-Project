import { Request, Response } from "express";
import { AppDataSource } from "..";
import { Author } from "../model/libraryEntity";

export const authorList = async (req: Request, res: Response) => {
    try {
      const author = await AppDataSource.getRepository(Author)
        .createQueryBuilder("author")
        .select("author")
        .getMany();
      res.json({ responseCode: 100, message: "İşlem başarılı", authorList: author });
    } catch (error) {
      res.send({ responseCode: -300, message: "işlem başarısız" });
    }
  };

  export const insertAuthor =  async (req: Request, res: Response) => {
    try {
      const { authorName, authorSurname } = req.body;
      const author = new Author();
      author.name =  authorName;
      author.surname = authorSurname;
      await AppDataSource.manager.save(author);
      console.log("Author has been saved. Author id is", author.id);
      res.json({ responseCode: 100, message: "İşlem başarılı" });
    } catch (error) {
      res.json({ responseCode: -300, message: "işlem başarısız" });
    }
  };

  export const updateAuthor = async (req: Request, res: Response) => {
    try {
      const { authorId, authorName, authorSurname } = req.body;
      const authorRepository = AppDataSource.getRepository(Author);
      const authorToUpdate = await authorRepository.findOneBy({
        id: authorId,
      });
      authorToUpdate.name = authorName;
      authorToUpdate.surname = authorSurname;
      await authorRepository.save(authorToUpdate);
      res.json({ responseCode: 100, message: "İşlem başarılı" });
    } catch (error) {
      res.json({ responseCode: -300, message: "işlem başarısız" });
    }
  };

  export const deleteAuthor = async (req: Request, res: Response) => {
    try {
      const { authorId } = req.body;
      const authorRepository = AppDataSource.getRepository(Author);
      const authorToRemove = await authorRepository.findOneBy({
        id: authorId,
      });
      await authorRepository.remove(authorToRemove);
      res.json({ responseCode: 100, message: "İşlem başarılı" });
    } catch (error) {
      res.json({ responseCode: -300, message: "işlem başarısız" });
    }
  };