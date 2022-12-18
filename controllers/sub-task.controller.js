const db = require("../db");
const defaultErrorMessage =
  "Произошла ошибка на сервере. Проверьте введенные данные";

class SubTaskController {
  async createSubTask(req, res) {
    try {
      const { title, taskId } = req.body;
      const newSubTask = await db.query(
        "INSERT INTO sub_task (title, description, hours, is_done, task_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [title, "", 0, false, taskId]
      );

      res.status(200).json(newSubTask.rows[0]);
    } catch (err) {
      res.status(500).json(defaultErrorMessage);
    }
  }

  async getSubTasksByTaskId(req, res) {
    try {
      const taskId = req.params.id;
      const subTasks = await db.query(
        "SELECT * FROM sub_task WHERE task_id=$1",
        [taskId]
      );

      res.json(subTasks.rows);
    } catch (err) {
      res.status(500).json(defaultErrorMessage);
    }
  }

  async getOneSubTask(req, res) {
    try {
      const id = req.params.id;
      const subTask = await db.query("SELECT * FROM sub_task WHERE id = $1", [
        id,
      ]);

      res.json(subTask.rows[0]);
    } catch (err) {
      res.status(500).json(defaultErrorMessage);
    }
  }

  async updateSubTask(req, res) {
    try {
      const { id, title, description, hours, isDone } = req.body;
      const updatedSubTask = await db.query(
        "UPDATE sub_task SET title=$1, description=$2, hours=$3, is_done=$4 WHERE id=$5 RETURNING *",
        [title, description, hours, isDone, id]
      );

      res.json(updatedSubTask.rows[0]);
    } catch (err) {
      res.status(500).json(defaultErrorMessage);
    }
  }

  async deleteSubTask(req, res) {
    try {
      const id = req.params.id;
      await db.query("DELETE FROM sub_task WHERE id=$1", [id]);

      res.json();
    } catch (err) {
      res.status(500).json(defaultErrorMessage);
    }
  }
}

module.exports = new SubTaskController();
