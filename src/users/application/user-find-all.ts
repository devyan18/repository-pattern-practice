import { UserRepository } from "../domain/user-repository";

export class UserFindAll {
  constructor (private readonly userRepository: UserRepository) {}

  async run () {
    const users = await this.userRepository.findAll();

    return users;
  }
}
