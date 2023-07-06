import express from "express";
import { login } from "../controller/user.controller.js";
import User from "../models/user.model.js";
import { MANAGER, SUPER_ADMIN } from "../constant/userTypes.js";

const userRouter = express.Router();

userRouter.post("/login", login);

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        type: SUPER_ADMIN,
      },
    });
    res.send(users);
  } catch (error) {
    console.log(error.message);
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const data = req.body;
    data.type = MANAGER;
    data.userId = 1;
    const user = await User.create(data);
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error.message);
  }
});

export default userRouter;
