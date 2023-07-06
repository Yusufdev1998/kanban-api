import db from "../config/db.js";

import Board from "../models/board.model.js";
import Column from "../models/column.model.js";
import SubTask from "../models/sub_task.model.js";
import Task from "../models/tasks.model.js";

export async function getBoards(req, res) {
  try {
    const result = await Board.findAll();
    res.json(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
    console.log(error.message);
  }
}

export async function createBoard(req, res) {
  const t = await db.transaction();
  try {
    const { name, columns } = req.body;
    const board = await Board.create({
      name,
      userId: req.user.id,
    });
    const mapedColumns = columns?.map(col => ({
      name: col,
      boardId: board.id,
    }));
    await Column.bulkCreate(mapedColumns, { validate: true });
    await t.commit();
    res.status(201).send({
      message: "created",
      data: board,
    });
  } catch (error) {
    await t.rollback();
    res.status(400).send({ message: error.message });
  }
}

export async function getBoardAll(req, res) {
  try {
    const board_id = req.params.id;
    const result = await Column.findAll({
      where: {
        boardId: board_id,
      },
      include: [{ model: Task, include: SubTask }],
    });

    res.json(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

export async function editBoard(req, res) {
  const t = await db.transaction();
  try {
    const board_id = req.params.id;
    const { name, columns } = req.body;

    const result = await Board.update(
      { name },
      { where: { id: board_id }, returning: true }
    );

    const mapedColumns = columns.map(col => ({ ...col, boardId: board_id }));

    const updatedColumns = await Column.bulkCreate(mapedColumns, {
      updateOnDuplicate: ["name"],
    });

    await t.commit();

    res.status(201).send({
      message: "updated",
      data: {
        ...result[1][0].dataValues,
        columns: updatedColumns,
      },
    });
  } catch (error) {
    await t.rollback();
    res.status(400).send({ message: error.message });
    console.log(error.message);
  }
}

export async function deleteBoard(req, res) {
  try {
    const board_id = req.params.id;
    await Board.destroy({ where: { id: board_id } });
    res.send({ message: "deleted", data: board_id });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}
