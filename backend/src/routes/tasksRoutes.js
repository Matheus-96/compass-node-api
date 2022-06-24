import express from "express";
import TaskController from "../controllers/TaskController.js";

const router = express.Router();

router
// .get("api/v1/tasks", TaskController.listTasks)
// .get("api/v1/tasks/search", TaskController.listTaskByCPF)
// .get("api/v1/tasks/:id", TaskController.listTaskById)
// .post("api/v1/tasks", TaskController.createTask)
// .put("api/v1/tasks/:id", TaskController.updateTask)
// .delete("api/v1/tasks/:id", TaskController.deleteTask)
export default router;