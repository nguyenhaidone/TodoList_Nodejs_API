import express from "express";
import {
  register,
  getAllUserAccount,
  login,
  updateUserAccount,
  getProfileUser,
  changeUserPassword,
  changeRole,
} from "./user.service";

export const registerAccount = async (
  req: express.Request,
  res: express.Response
) => {
  register(req, res);
};
export const loginAccount = (req: express.Request, res: express.Response) => {
  login(req, res);
};

export const getAllUser = (req: express.Request, res: express.Response) => {
  getAllUserAccount(req, res);
};

export const updateAccount = (req: express.Request, res: express.Response) => {
  updateUserAccount(req, res);
};

export const changePassword = (req: express.Request, res: express.Response) => {
  changeUserPassword(req, res);
};

export const getProfile = (req: express.Request, res: express.Response) => {
  getProfileUser(req, res, req.params.id);
};

export const updateRole = (req: express.Request, res: express.Response) => {
  changeRole(req, res);
};
