import { UserRepository } from "../domain/user-repository";
import { UserNotFound } from "../domain/user-not-found";

export class UserByIdFinder {
  constructor (private readonly userRepository: UserRepository) {}

  async run (id: number) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFound(id);
    }

    return user;
  }
}
