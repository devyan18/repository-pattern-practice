import { User } from "./user";

export interface UserRepository {
    findById(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
    create({ username, password }: {username: string, password: string}): Promise<void>;
}
