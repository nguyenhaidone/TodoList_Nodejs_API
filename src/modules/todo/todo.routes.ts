import express from "express";

import {
  post,
  updateTask,
  getAllTask,
  deleteTask,
  getTaskById,
} from "./todo.controller";
import { verifyAccount } from "../../middleware/auth.verify";

const router: express.Router = express.Router();
/**
 * Post a task
 * Method: POST
 * Authorization: current user
 * route: http://localhost:3000/api/task/
 */

router.post("/", verifyAccount, post);

/**
 * Get all date
 * Method: GET
 * Authorization: current user
 * route: http://localhost:3000/api/task/
 */

router.get("/", verifyAccount, getAllTask);

/**
 * Get data by id
 * Method: GET
 * Authorization: current user
 * route: http://localhost:3000/api/task/60e53518b92f530e3c9c3562
 */

router.get("/:id", verifyAccount, getTaskById);

/**
 * Update task by id
 * Method: PUT
 * Authorization: current user
 * route: http://localhost:3000/api/task/60e53518b92f530e3c9c3562
 */

router.put("/:id", verifyAccount, updateTask);

/**
 * Delete a task by id
 * Method: DELETE
 * Authorization: current user
 * route: http://localhost:3000/api/task/60e524e03f379337f44b550f
 */

router.delete("/:id", verifyAccount, deleteTask);

/**
 * 
 */
export default router;
