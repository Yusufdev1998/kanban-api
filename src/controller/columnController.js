import Column from "../models/column.model.js";
export async function deleteColumn(req, res) {
  try {
    const column_id = req.params.id;
    await Column.destroy({ where: { id: column_id } });
    res.send({ message: "deleted" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}
