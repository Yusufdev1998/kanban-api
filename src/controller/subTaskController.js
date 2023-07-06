import SubTask from "../models/sub_task.model.js";

export async function deleteSubTask(req, res) {
  try {
    const sub_task_id = req.params.id;
    await SubTask.destroy({ where: { id: sub_task_id } });
    res.send({ message: "deleted", data: sub_task_id });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}
