import express from "express";

import dotenv from "dotenv";

import cors from "cors";

import todoRouter from "./src/modules/todo/todo.routes";

import userRouter from "./src/modules/user/user.routes";

import connectDB from "./src/config/dbConfiguration";

connectDB();
dotenv.config();

const app = express();

const port: number | string = process.env.PORT || 5000;

const TaskRoute: express.Router = todoRouter as express.Router;
const UserRouter: express.Router = userRouter as express.Router;

app.use(cors({}));
app.use(express.json());

app.use("/api/task", TaskRoute);
app.use("/api/user", UserRouter);


app.listen(port, (): void => {
  console.log("listen on port", port);
});
