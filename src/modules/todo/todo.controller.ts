import express from "express";

import {
  getDataFromDatabase,
  getDataById,
  postTask,
  updateTaskById,
  deleteTaskById,
} from "./todo.service";
import { ITask } from "../../common/interfaceProps";

export const post = async (req: express.Request, res: express.Response) => {
  postTask(req, res).then((res) => {
    console.log(res);
  });
};

export const getAllTask = async (
  req: express.Request,
  res: express.Response
) => {
  getDataFromDatabase(req, res).then((res: ITask[] | any) => {
    console.log(res);
  });
};

export const getTaskById = async (
  req: express.Request,
  res: express.Response
) => {
  getDataById(req, res).then((res: ITask[] | any) => {
    console.log(res);
  });
};

export const updateTask = async (
  req: express.Request,
  res: express.Response
) => {
  updateTaskById(req, res).then((res) => console.log(res));
};

export const deleteTask = async (
  req: express.Request,
  res: express.Response
) => {
  deleteTaskById(req, res).then((res) => console.log(res));
};