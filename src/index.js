import express from "express";

import cors from "cors";

import boardRoutes from "./routes/board.routes.js";
import taskRoutes from "./routes/task.routes.js";
import columnRouter from "./routes/column.routes.js";
import subTaskRouter from "./routes/subTask.routes.js";
import userRouter from "./routes/user.routes.js";
import { auth } from "./middleware/auth.js";
import { getPlans } from "./controller/plan.controller.js";
import userRelations from "./models/userRelations.js";

userRelations();

import dotev from "dotenv";

dotev.config();

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/boards", auth, boardRoutes);
app.use("/tasks", auth, taskRoutes);
app.use("/columns", auth, columnRouter);
app.use("/sub-tasks", auth, subTaskRouter);

app.get("/plans", getPlans);

app.use("/user", userRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("server is running...");
});
