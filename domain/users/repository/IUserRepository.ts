import { User } from '../entities/Users';

export interface IUserRepository {
  get: (id: number) => Promise<User | undefined>;
  findByUsername: (username: string, password: string) => Promise<User | undefined>;
  list: () => Promise<User[]>;
  save: (User) => Promise<void>;
  remove: (id: number) => Promise<void>;
}
