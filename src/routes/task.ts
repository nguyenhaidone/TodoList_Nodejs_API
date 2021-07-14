import express from "express";

import Task from "../models/ListModels";

import { response } from "../common/response";

const router: express.Router = express.Router();


/**
 * Post a task
 * Method: POST
 * route: http://localhost:3000/api/task/
 */

router.post("/", async (req: express.Request, res: express.Response) => {
  const { title, complete, desc, isImportant }: ITask = req.body;
  if (title === "")
    return res.status(400).json(response(false, "Title is required"));
  try {
    const newTask = new Task({
      title,
      complete,
      desc,
      isImportant,
    });
    await newTask.save();
    res.status(200).json(response(true, "Add new task successfully", newTask));
  } catch (error) {
    res.status(400).json(response(false, "Add new task fail"));
  }
});

/**
 * Get all date
 * Method: GET
 * route: http://localhost:3000/api/task/
 */

router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const getData = await Task.find();
    res.status(200).send(response(true, "Get all data successfully", getData));
  } catch (error) {
    res.status(500).send(response(false, "Internal Server Error"));
  }
});

/**
 * Get data by id
 * Method: GET
 * route: http://localhost:3000/api/task/60e53518b92f530e3c9c3562
 */

router.get("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const getTaskConditionById: Object = {
      _id: req.params.id,
    };

    const getTaskContentById = await Task.findOne(getTaskConditionById);

    if (!getTaskContentById)
      return res
        .status(404)
        .json(response(false, `Task ${req.params.id} not found`));
    else
      return res
        .status(200)
        .json(
          response(
            true,
            `Get task ${req.params.id} successfully`,
            getTaskContentById
          )
        );
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

/**
 * Update task by id
 * Method: PUT
 * route: http://localhost:3000/api/task/60e53518b92f530e3c9c3562
 */

router.put("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const { title, complete, desc, isImportant }: ITask = req.body;

    const getTaskById: Object = {
      _id: req.params.id,
    };

    const taskData = await Task.findOne(getTaskById);

    if (!taskData)
      return res
        .status(400)
        .json(response(false, `Task ${req.params.id} not found`));
    else {
      if (title === "")
        return res.status(400).json(response(false, "Title is required!"));
      else {
        let updatedTask: ITask = {
          title: title === undefined ? taskData.title : title,
          complete: complete === undefined ? taskData.complete : complete,
          desc: desc === undefined ? taskData.desc : desc,
          isImportant:
            isImportant === undefined ? taskData.isImportant : isImportant,
        };

        await Task.findOneAndUpdate(getTaskById, updatedTask, {
          new: true,
        });
        return res
          .status(200)
          .json(
            response(true, `Task ${req.params.id} is updated`, updatedTask)
          );
      }
    }

    // if (title === "")
    //   return res.status(400).json(response(false, "Title is required!"));
    // else {
    //   const getIdTask: Object = {
    //     _id: req.params.id,
    //   };
    //   let updatedTask = {
    //     title: title,
    //     complete: complete,
    //     desc: desc,
    //     isImportant: isImportant,
    //   };

    //   await Task.findOneAndUpdate(getIdTask, updatedTask, {
    //     new: true,
    //   });

    //   if (!updatedTask)
    //     return res
    //       .status(400)
    //       .json(response(false, `Task ${req.params.id} not found`));
    //   else
    //     return res
    //       .status(200)
    //       .json(
    //         response(true, `Task ${req.params.id} is updated`, updatedTask)
    //       );
    // }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

/**
 * Delete a task by id
 * Method: DELETE
 * route: http://localhost:3000/api/task/60e524e03f379337f44b550f
 */

router.delete("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const getTaskConditionById: Object = {
      _id: req.params.id,
    };

    const deleteTaskContentById = await Task.findOneAndDelete(
      getTaskConditionById
    );

    if (!deleteTaskContentById)
      return res
        .status(404)
        .json(response(false, `Task ${req.params.id} not found`));
    else
      return res
        .status(200)
        .json(
          response(
            true,
            `Delete task ${req.params.id} successfully`,
            deleteTaskContentById
          )
        );
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
