import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { MANAGER, MEMBER, SUPER_ADMIN } from "../constant/userTypes.js";
import Board from "./board.model.js";
const { STRING } = DataTypes;
const User = db.define("user", {
  first_name: {
    type: STRING,
    allowNull: false,
  },
  full_name: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.first_name} ${this.last_name}`;
    },
    set(value) {
      throw new Error("Do not try to set the `fullName` value!");
    },
  },
  type: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isIn: [[SUPER_ADMIN, MANAGER, MEMBER]],
    },
  },
  last_name: STRING,
  oragnization: STRING,
  password: STRING,
  phone: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  extra_phone: STRING,
  email: {
    type: STRING,
    validate: {
      isEmail: {
        msg: "Emailni togri krit!",
      },
    },
  },
});

User.hasMany(User);
User.hasMany(Board);
User.belongsTo(User);

export default User;
