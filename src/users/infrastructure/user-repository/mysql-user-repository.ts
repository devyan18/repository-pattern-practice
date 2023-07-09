import { User } from "../../domain/user";
import { UserRepository } from "../../domain/user-repository";
import { UserModel } from "./user-model";
import { z } from "zod";
import { CreateUserProps, UpdateUserProps } from "../../domain/user-validations";

export class MysqlUserRepository implements UserRepository {
  async findById (id: number): Promise<User | null> {
    const user = await UserModel.findOne({ where: { id } });

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

  async update (user: User): Promise<User | null> {
    const findedUser = await UserModel.findOne({ where: { id: user.id } });
    if (!findedUser) return null;

    return await findedUser.update({ username: user.username, password: user.password });
  }

  async delete (id: number): Promise<User | null> {
    const findedUser = await UserModel.findOne({ where: { id } });
    if (!findedUser) return null;

    await findedUser.destroy();

    return findedUser;
  }

  async createValidation (props: z.AnyZodObject): Promise<void> {
    const createUserProps = CreateUserProps.parse(props);

    const user = await UserModel.findOne({ where: { username: createUserProps.username } });

    if (user) throw new Error("Username already exists");
  }

  async updateValidation (props: z.AnyZodObject): Promise<void> {
    UpdateUserProps.parse(props);
  }
}
