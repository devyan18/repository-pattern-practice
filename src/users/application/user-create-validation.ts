import { UserRepository } from "../domain/user-repository";
import { z } from "zod";

export class CreateUserValidation {
  constructor (private readonly userRepository: UserRepository) {}

  async run (props: z.AnyZodObject) {
    await this.userRepository.createValidation(props);
  }
}
