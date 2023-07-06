import express from "express";
import {
  createBoard,
  deleteBoard,
  editBoard,
  getBoardAll,
  getBoards,
} from "../controller/board.controller.js";

const boardRoutes = express.Router();

boardRoutes.get("/", getBoards);
boardRoutes.get("/:id", getBoardAll);
boardRoutes.patch("/:id", editBoard);
boardRoutes.post("/", createBoard);

boardRoutes.delete("/:id", deleteBoard);

export default boardRoutes;
