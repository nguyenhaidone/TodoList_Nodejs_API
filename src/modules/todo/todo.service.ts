import Task from "../../models/ListModels";
import express, { Request } from "express";

import { response } from "../../common/response";
import { ITask } from "../../common/interfaceProps";

/**
 * Only current users can get their post
 */
export const getDataFromDatabase = async (
  req: express.Request | any,
  res: express.Response
) => {
  if (req.userData.role === "user") {
    let getData: ITask[] = [];
    try {
      getData = await Task.find({
        user: req.userData.userId,
      });
      res
        .status(200)
        .send(response(true, "Get all data successfully", getData));
    } catch (error) {
      res.status(500).send(response(false, "Internal Server Error"));
    }
    return getData;
  } else {
    res.status(403).json(response(false, "Forbidden access"));
  }
};
/**
 * Only current users can get their post
 */
export const getDataById = async (
  req: express.Request | any,
  res: express.Response
) => {
  if (req.userData.role === "user") {
    let getTaskContentById: ITask | ITask[] | any = [];
    try {
      const getTaskConditionById: Object = {
        _id: req.params.id,
      };

      getTaskContentById = await Task.findOne(getTaskConditionById);
      if (getTaskContentById.user == req.userData.userId) {
        if (!getTaskContentById)
          res
            .status(404)
            .json(response(false, `Task ${req.params.id} not found`));
        else
          res
            .status(200)
            .json(
              response(
                true,
                `Get task ${req.params.id} successfully`,
                getTaskContentById
              )
            );
      } else res.status(403).json(response(false, "Forbidden access"));
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
    return getTaskContentById;
  } else res.status(403).json(response(false, "Forbidden access"));
};
/**
 * Only current user can post
 */
export const postTask = async (
  req: express.Request | any,
  res: express.Response
) => {
  if (req.userData.role === "user") {
    let { title, complete, desc, isImportant }: ITask = req.body;
    let user = req.userData.userId;
    if (title === "")
      return res.status(400).json(response(false, "Title is required"));
    try {
      const newTask = new Task({
        title,
        complete,
        desc,
        isImportant,
        user,
      });
      await newTask.save();
      res
        .status(200)
        .json(response(true, "Add new task successfully", newTask));
    } catch (error) {
      res.status(400).json(response(false, "Add new task fail"));
    }
    return { title, complete, desc, isImportant };
  } else res.status(403).json(response(false, "Forbidden access."));
};
/**
 * Only current user can update post
 */
export const updateTaskById = async (
  req: express.Request | any,
  res: express.Response
) => {
  if (req.userData.role === "user") {
    let updatedTask;
    try {
      const { title, complete, desc, isImportant } = req.body;

      const getTaskById: Object = {
        _id: req.params.id,
      };

      const taskData = await Task.findOne(getTaskById);
      if (req.userData.userId == taskData.user) {
        // console.log(taskData.user);

        if (!taskData)
          return res
            .status(400)
            .json(response(false, `Task ${req.params.id} not found`));
        else {
          if (title === "")
            res.status(400).json(response(false, "Title is required!"));
          else {
            updatedTask = {
              title: title === undefined ? taskData.title : title,
              complete: complete === undefined ? taskData.complete : complete,
              desc: desc === undefined ? taskData.desc : desc,
              isImportant:
                isImportant === undefined ? taskData.isImportant : isImportant,
            };

            await Task.findOneAndUpdate(getTaskById, updatedTask, {
              new: true,
            });
            res
              .status(200)
              .json(
                response(true, `Task ${req.params.id} is updated`, updatedTask)
              );
          }
        }
      } else {
        res.status(403).json(response(false, "Forbidden access"));
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
    return updatedTask;
  } else res.status(403).json(response(false, "Forbidden access"));
};
/**
 * Only current user can delete post
 */
export const deleteTaskById = async (
  req: express.Request | any,
  res: express.Response
) => {
  if (req.userData.role === "user") {
    try {
      const getTaskConditionById: Object = {
        _id: req.params.id,
      };
      const getTaskId = await Task.findOne(getTaskConditionById);
      if (getTaskId.user == req.userData.userId) {
        const deleteTaskContentById = await Task.findOneAndDelete(
          getTaskConditionById
        );

        if (!deleteTaskContentById)
          res
            .status(404)
            .json(response(false, `Task ${req.params.id} not found`));
        else
          res
            .status(200)
            .json(
              response(
                true,
                `Delete task ${req.params.id} successfully`,
                deleteTaskContentById
              )
            );
      } else res.status(403).json(response(false, "Forbidden access"));
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  } else res.status(403).json(response(false, "Forbidden access"));
};
