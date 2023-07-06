import express from "express";
import { deleteColumn } from "../controller/columnController.js";

const columnRouter = express.Router();

columnRouter.delete("/:id", deleteColumn);

export default columnRouter;
