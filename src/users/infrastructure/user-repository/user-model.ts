import { sequelize } from "../../../connections/mysql";
import { User } from "../../domain/user";

import { DataTypes, Model } from "sequelize";

interface IUserModel extends User, Model {}

const UserModel = sequelize.define<IUserModel>("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      len: [8, 255]
    },
    allowNull: false
  }
}, {
  tableName: "users",
  timestamps: true
});

export { UserModel };
