import { MysqlUserRepository } from "./user-repository/mysql-user-repository";
import { UserByIdFinder } from "../application/user-by-id-finder";
import { UserController } from "./http/user-controller";
import { UserCreate } from "../application/user-create";
import { UserFindAll } from "../application/user-find-all";

const mysqlUserRepository = new MysqlUserRepository();
const userByIdFinder = new UserByIdFinder(mysqlUserRepository);
const userCreate = new UserCreate(mysqlUserRepository);
const userFindAll = new UserFindAll(mysqlUserRepository);

export const userController = new UserController(userByIdFinder, userCreate, userFindAll);
