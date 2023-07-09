import { User } from "../domain/user";
import { UserRepository } from "../domain/user-repository";

export class UserUpdate {
  constructor (private readonly userRepository: UserRepository) {}

  async run (user: User) {
    await this.userRepository.update(user);
  }
}
