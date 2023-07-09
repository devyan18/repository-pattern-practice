import express from "express";

import { userController } from "../dependencies";

const userRouter = express.Router();

userRouter.get("/", userController.list.bind(userController));
userRouter.get("/:id", userController.get.bind(userController));
userRouter.post("/",
  userController.validationCreateEntry.bind(userController),
  userController.post.bind(userController)
);
userRouter.put("/", userController.validationUpdateEntry.bind(userController), userController.put.bind(userController));

export { userRouter };
