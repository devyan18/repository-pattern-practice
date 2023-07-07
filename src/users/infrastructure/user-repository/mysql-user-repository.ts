import { User } from "../../domain/user";
import { UserRepository } from "../../domain/user-repository";
import { UserModel } from "./user-model";

export class MysqlUserRepository implements UserRepository {
  async findById (id: number): Promise<User | null> {
    const user = await UserModel.findOne({
      where: {
        id
      }
    });

    if (!user) {
      return null;
    }

    return user ? new User(user.id, user.username, user.password) : null;
  }

  async create ({ username, password }: {username: string, password: string}): Promise<void> {
    if (!username) throw new Error("Username is required");
    if (!password) throw new Error("Password is required");

    await UserModel.create({ username, password });
  }

  async findAll (): Promise<User[]> {
    const users = await UserModel.findAll();

    return users.map((user) => new User(user.id, user.username, user.password));
  }
}
