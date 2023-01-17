import express from "express";
import { authorList, deleteAuthor, insertAuthor, updateAuthor } from "../controller/author";
import { bookList,deleteBook,insertBook, updateBook } from "../controller/book";
import {signJwt } from "../controller/login";
import {tokenLoginControl } from "../middleware/verify-token";
import { deletePublisher, insertPublisher, publisherList, updatePublisher } from "../controller/publisher";
import { bookNameAndAuthor } from "../middleware/book";
import { publisherName } from "../middleware/publisher";
import { Register } from "../controller/register";
import { deleteUser, updateUser, userList } from "../controller/user";
import { userName } from "../middleware/user";
import { bookDetailList } from "../controller/bookDetail";
import { loginControl } from "../middleware/panelUser";


export const libraryRouter = express.Router();

//#region BOOK
libraryRouter.get("/bookList", tokenLoginControl, bookList);
libraryRouter.post("/insertBook", tokenLoginControl, bookNameAndAuthor,  insertBook);
libraryRouter.put("/updateBook", tokenLoginControl, updateBook);
libraryRouter.delete("/deleteBook", tokenLoginControl, deleteBook);
//#endregion

//#region AUTHOR
libraryRouter.get("/authorList", tokenLoginControl, authorList);
libraryRouter.post("/insertAuthor", tokenLoginControl, insertAuthor);
libraryRouter.put("/updateAuthor", tokenLoginControl, updateAuthor);
libraryRouter.delete("/deleteAuthor", tokenLoginControl, deleteAuthor);
//#endregion

//#region PUBLİSHER
libraryRouter.get("/publisherList", tokenLoginControl, publisherList);
libraryRouter.post("/insertPublisher", tokenLoginControl, publisherName, insertPublisher);
libraryRouter.put("/updatePublisher", tokenLoginControl, updatePublisher);
libraryRouter.delete("/deletePublisher", tokenLoginControl, deletePublisher);
//#endregion

//#region LOGIN
libraryRouter.post("/login", loginControl,signJwt)
//#endregion

//#region REGISTER
libraryRouter.post("/register",userName,Register)
//#endregion

//#region USER
libraryRouter.get("/userList",tokenLoginControl, userList)
libraryRouter.put("/updateUser",tokenLoginControl, updateUser);
libraryRouter.delete("/deleteUser",tokenLoginControl, deleteUser);
//#endregions

//#region BOOK DETAIL
libraryRouter.get("/bookDetailList",tokenLoginControl, bookDetailList)
//#endregions

