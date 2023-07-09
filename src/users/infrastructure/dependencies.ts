import { MysqlUserRepository } from "./user-repository/mysql-user-repository";
import { UserByIdFinder } from "../application/user-by-id-finder";
import { UserController } from "./http/user-controller";
import { UserCreate } from "../application/user-create";
import { UserUpdate } from "../application/user-update";
import { UserFindAll } from "../application/user-find-all";
import { CreateUserValidation } from "../application/user-create-validation";
import { UpdateUserValidation } from "../application/user-update-validation";

const mysqlUserRepository = new MysqlUserRepository();
const userByIdFinder = new UserByIdFinder(mysqlUserRepository);
const userCreate = new UserCreate(mysqlUserRepository);
const userUpdate = new UserUpdate(mysqlUserRepository);
const userFindAll = new UserFindAll(mysqlUserRepository);
const createUserValidation = new CreateUserValidation(mysqlUserRepository);
const updateUserValidation = new UpdateUserValidation(mysqlUserRepository);

export const userController = new UserController(
  userFindAll,
  userByIdFinder,
  userCreate,
  userUpdate,
  createUserValidation,
  updateUserValidation
);
