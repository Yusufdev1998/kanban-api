import db from "../config/db.js";
import SubTask from "../models/sub_task.model.js";
import Task from "../models/tasks.model.js";
export async function getTasks(req, res) {
  try {
    const result = await db.query("select * from tasks");
    res.json(result.rows);
  } catch (error) {
    res.status(400).send({ message: error.message });
    console.log(error.message);
  }
}

export async function createTask(req, res) {
  const t = await db.transaction();
  try {
    const { title, description, status_id, subtasks } = req.body;

    const task = await Task.create({
      title,
      description,
      status_id,
    });
    const mapedSubs = subtasks.map(sub => ({ title: sub, taskId: task.id }));
    const subTasks = await SubTask.bulkCreate(mapedSubs, { validate: true });
    await t.commit();
    res.status(201).send({
      message: "created",
      data: {
        ...task.dataValues,
        sub_tasks: subTasks,
      },
    });
  } catch (error) {
    await t.rollback();
    res.status(400).send({ message: error.message });
    console.log(error.message);
  }
}

export async function updateTask(req, res) {
  const t = await db.transaction();

  try {
    const { title, description, status_id, subtasks } = req.body;
    const task_id = req.params.id;
    const result = await Task.update(
      {
        title,
        description,
        status_id,
      },
      { where: { id: task_id }, returning: true }
    );

    const mapedSubs = subtasks.map(sub => ({ ...sub, taskId: task_id }));
    const subs = await SubTask.bulkCreate(mapedSubs, {
      updateOnDuplicate: ["id", "title", "completed"],
    });

    console.log(subs);
    t.commit();
    res.status(201).send({
      message: "updated",
      data: {
        ...result[1][0].dataValues,
        subtasks: subs,
      },
    });
  } catch (error) {
    t.rollback();
    res.status(400).send({ message: error.message });
    console.log(error.message);
  }
}

export async function deleteTask(req, res) {
  try {
    const task_id = req.params.id;
    await Task.destroy({ where: { id: task_id } });
    res.send({ message: "deleted", data: task_id });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

// {
//   title,
//   desc,
//   subtasks,
//   status_id
// }
