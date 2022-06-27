import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

router
  .get("/api/v1/users", UserController.listUser)
  .get("/api/v1/users/:id", UserController.listUserById)
  .post("/api/v1/users", UserController.createUser)
  .put("/api/v1/users/:id", UserController.updateUser)
  .delete("/api/v1/users/:id", UserController.deleteUser)
export default router;