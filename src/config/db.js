import { Sequelize } from "sequelize";

// const db = new Sequelize("kanban", "postgres", "1234", {
//   host: "localhost",
//   dialect: "postgres",
// });

const db = new Sequelize(
  "postgres://kanban_5h4b_user:8vZEEih1zweNC1nCLf71NOnAi5Do3hbs@dpg-cij5b0p5rnut2salncog-a.singapore-postgres.render.com/kanban_5h4b"
);

try {
  await db.authenticate();
  console.log("db connected");
} catch (error) {
  console.error("db con error:", error);
}

export default db;
