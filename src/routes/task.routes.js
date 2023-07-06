import express from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controller/task.controller.js";

const taskRoutes = express.Router();

taskRoutes.get("/", getTasks);
taskRoutes.patch("/:id", updateTask);
taskRoutes.post("/", createTask);
taskRoutes.delete("/:id", deleteTask);

export default taskRoutes;
