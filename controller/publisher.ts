import { Request, Response } from "express";
import { AppDataSource } from "..";
import { Publisher } from "../model/libraryEntity";

export const publisherList = async (req: Request, res: Response) => {
    try {
      const publisher = await AppDataSource.getRepository(Publisher)
        .createQueryBuilder("publisher")
        .select("publisher")
        .getMany();
      res.json({ responseCode: 100, message: "İşlem başarılı", publisherList: publisher });
    } catch (error) {
      res.json({ responseCode: -300, message: "işlem başarısız" });
    }
  };

  
  export const insertPublisher =  async (req: Request, res: Response) => {
    try {
      const { publisherName } = req.body;
      const publisher = new Publisher();
      publisher.name =  publisherName;
      await AppDataSource.manager.save(publisher);
      console.log("Publisher has been saved. Publisher id is", publisher.id);
      res.json({ responseCode: 100, message: "İşlem başarılı" });
    } catch (error) {
      res.json({ responseCode: -300, message: "işlem başarısız" });
    }
  };

  
  export const updatePublisher = async (req: Request, res: Response) => {
    try {
      const { publisherId, publisherName } = req.body;
      const publisherRepository = AppDataSource.getRepository(Publisher);
      const publisherToUpdate = await publisherRepository.findOneBy({
        id: publisherId,
      });
      publisherToUpdate.name = publisherName;
      await publisherRepository.save(publisherToUpdate);
      res.json({ responseCode: 100, message: "İşlem başarılı" });
    } catch (error) {
      res.json({ responseCode: -300, message: "işlem başarısız" });
    }
  };

  export const deletePublisher = async (req: Request, res: Response) => {
    try {
      const { publisherId } = req.body;
      const publisherRepository = AppDataSource.getRepository(Publisher);
      const publisherToRemove = await publisherRepository.findOneBy({
        id: publisherId,
      });
      await publisherRepository.remove(publisherToRemove);
      res.json({ responseCode: 100, message: "İşlem başarılı" });
    } catch (error) {
      res.json({ responseCode: -300, message: "işlem başarısız" });
    }
  };