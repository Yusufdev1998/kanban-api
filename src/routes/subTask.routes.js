import express from "express";
import { deleteSubTask } from "../controller/subTaskController.js";

const subTaskRouter = express.Router();

subTaskRouter.delete("/:id", deleteSubTask);

export default subTaskRouter;
