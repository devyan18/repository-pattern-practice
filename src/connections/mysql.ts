import { Sequelize } from "sequelize";
import { config } from "../config";

const { stringConnection } = config.db.mysql;

const sequelize = new Sequelize(stringConnection);

export { sequelize };
