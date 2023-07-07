import express from "express";

import { userController } from "../dependencies";

const userRouter = express.Router();

userRouter.get("/", userController.list.bind(userController));
userRouter.get("/:id", userController.get.bind(userController));
userRouter.post("/", userController.post.bind(userController));

export { userRouter };
