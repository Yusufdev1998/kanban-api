import { DataTypes } from "sequelize";
import db from "../config/db.js";
import SubTask from "./sub_task.model.js";

const Task = db.define("task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
});

Task.hasMany(SubTask);
export default Task;
