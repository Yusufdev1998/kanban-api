import { DataTypes } from "sequelize";
import db from "../config/db.js";

const SubTask = db.define("sub_task", {
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default SubTask;
