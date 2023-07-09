import { z } from "zod";
import { User } from "./user";

export const UserProps = z.instanceof(User);

export const CreateUserProps = z.object({
  username: z.string().min(3).max(255),
  password: z.string().min(8).max(255)
});

export const UpdateUserProps = z.object({
  id: z.number(),
  username: z.string().min(3).max(255),
  password: z.string().min(8).max(255)
});
