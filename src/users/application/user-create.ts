import { UserRepository } from "../domain/user-repository";

export class UserCreate {
  constructor (private readonly userRepository: UserRepository) {}

  async run ({ username, password }: {username: string, password: string}) {
    await this.userRepository.create({ username, password });
  }
}
