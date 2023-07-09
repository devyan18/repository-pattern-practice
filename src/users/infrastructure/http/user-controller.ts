import { NextFunction, Request, Response } from "express";
import { UserByIdFinder } from "../../application/user-by-id-finder";
import { UserNotFound } from "../../domain/user-not-found";
import { UserCreate } from "../../application/user-create";
import { UserFindAll } from "../../application/user-find-all";
import { CreateUserValidation } from "../../application/user-create-validation";
import { z } from "zod";
import { UserEntryError } from "../../domain/user-entry-error";
import { UpdateUserValidation } from "../../application/user-update-validation";
import { UserUpdate } from "../../application/user-update";

export class UserController {
  constructor (
    private readonly userFindAll: UserFindAll,
    private readonly userByIdFinder: UserByIdFinder,
    private readonly userCreate: UserCreate,
    private readonly userUpdate: UserUpdate,
    private readonly userCreateValidation: CreateUserValidation,
    private readonly userUpdateValidation: UpdateUserValidation
  ) {}

  async get (req: Request, res: Response) {
    try {
      const user = await this.userByIdFinder.run(Number(req.params.id));

      res.json(user);
    } catch (error) {
      if (error instanceof UserNotFound) {
        return res.status(404).send(error.message);
      }

      res.status(500).send("Internal server error");
    }
  }

  async post (req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      await this.userCreate.run({ username, password });

      res.status(201).send();
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }

  async list (req: Request, res: Response) {
    try {
      const users = await this.userFindAll.run();

      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }

  async put (req: Request, res: Response) {
    try {
      const { id, username, password } = req.body;

      await this.userUpdate.run({ id, username, password });

      res.status(201).send();
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }

  async validationCreateEntry (req: Request, res: Response, next: NextFunction) {
    try {
      await this.userCreateValidation.run(req.body);

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const lens = new UserEntryError(error).pretty();

        return res.status(400).json(lens);
      }

      console.log(error);
      res.status(500).send("Internal server error");
    }
  }

  async validationUpdateEntry (req: Request, res: Response, next: NextFunction) {
    try {
      await this.userUpdateValidation.run(req.body);

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const lens = new UserEntryError(error).pretty();

        return res.status(400).json(lens);
      }

      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
}
