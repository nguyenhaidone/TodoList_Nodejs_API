import express from "express";

import {
  registerAccount,
  loginAccount,
  getAllUser,
  updateAccount,
  getProfile,
  changePassword,
  updateRole,
  getCurrent,
} from "./user.controller";
import { verifyAccount } from "../../middleware/auth.verify";

const router: express.Router = express.Router();
/**
 * Register
 * Method: Post
 * Authorization: Anomyous
 * Route: http://localhost:5000/api/user/register/
 */

router.post("/register", registerAccount);

/**
 * Login
 * Method: Post
 * Authorization: Anomyous
 * Route: http://localhost:5000/api/user/login/
 */
router.post("/login", loginAccount);

/**
 * Get all account
 * Method: Get
 * Authorization: Admin
 * Route: http://localhost:5000/api/user/getAllAccount
 */
router.get("/get-all-user-account", verifyAccount, getAllUser);

/**
 * Update account
 * Method: PUT
 * Authorization: User
 * Route: http://localhost:5000/api/user/updateAccount/:id
 */
router.put("/update-profile/:id", verifyAccount, updateAccount);

/**
 * Change password
 * Method: PUT
 * Authorization: User
 * Route: http://localhost:5000/api/user/change-password/:id
 */
router.put("/change-password/:id", verifyAccount, changePassword);

/**
 * Get profile user
 * Method: GET
 * Authorization: Admin
 * Route: http://localhost:5000/api/user/profile/:id
 */
router.get("/profile/:id", verifyAccount, getProfile);

/**
 * Update role
 * Method: PUT
 * Authorization: Admin
 * Route: http://localhost:5000/api/user/change-role/:id
 */
router.put("/change-role/:id", verifyAccount, updateRole);

/**
 * Get profile current user
 * Method: GET
 * Authorization: User
 * Route: http://localhost:5000/api/user/current-user
 */
router.get("/current-user", verifyAccount, getCurrent);
export default router;
