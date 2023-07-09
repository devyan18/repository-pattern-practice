import { User } from "./user";
import { z } from "zod";

export interface UserRepository {
  findById(id: number): Promise<User | null>;

  findAll(): Promise<User[]>;

  create({ username, password }: {username: string;password: string;}): Promise<void>;

  update(user: User): Promise<User | null>;

  delete(id: number): Promise<User | null>;

  createValidation (props: z.AnyZodObject): Promise<void>;

  updateValidation (props: z.AnyZodObject): Promise<void>;
}
