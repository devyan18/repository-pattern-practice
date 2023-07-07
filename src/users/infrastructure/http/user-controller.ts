import { Request, Response } from "express";
import { UserByIdFinder } from "../../application/user-by-id-finder";
import { UserNotFound } from "../../domain/user-not-found";
import { UserCreate } from "../../application/user-create";
import { UserFindAll } from "../../application/user-find-all";

export class UserController {
  constructor (
    private readonly userByIdFinder: UserByIdFinder,
    private readonly userCreate: UserCreate,
    private readonly userFindAll: UserFindAll
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
}
