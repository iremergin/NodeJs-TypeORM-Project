import bodyParser from "body-parser";
import express from "express";
export const app = express();
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Book, Author, Publisher, PanelUser, User, BookStatus, BookDetail } from "./model/libraryEntity";
import { libraryRouter } from "./routers/route";

app.use(express.json());
app.use("/api", libraryRouter);
app.set("api_secret_key", require("./config").api_secret_key);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export const AppDataSource = new DataSource({
  type: "mssql",
  host: "localhost",
  port: 1433,
  username: "sa",
  password: "123",
  database: "TestDB",
  synchronize: true,
  logging: false,
  entities: [Author, Book, Publisher, PanelUser, User, BookStatus, BookDetail],
  subscribers: [Author, Book, Publisher, PanelUser, User, BookStatus, BookDetail],
  migrations: [Author, Book, Publisher, PanelUser, User, BookStatus, BookDetail],
  extra: {
    trustServerCertificate: true,
  },
});

app.listen(5000, async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((error) =>
      console.error("Error during Data Source initialization", error)
    );

  console.log("STARTED...");
});
