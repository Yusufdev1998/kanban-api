import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Task from "./tasks.model.js";

const Column = db.define("column", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
Column.hasMany(Task, { foreignKey: "status_id" });
export default Column;
