import db from "../config/db.js";
import Board from "./board.model.js";
import Column from "./column.model.js";
import SubTask from "./sub_task.model.js";
import Task from "./tasks.model.js";
import User from "./user.model.js";

export default () => {
  Board.belongsTo(User);
  Column.belongsTo(Board);
  Task.belongsTo(Column, { foreignKey: "status_id" });
  SubTask.belongsTo(Task);
  db.sync();
};
