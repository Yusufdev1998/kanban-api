import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Column from "./column.model.js";

const Board = db.define("board", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Board.hasMany(Column);

export default Board;
