import { User } from '../entities/Users';

export interface IUserRepository {
  get: (id: number) => Promise<User | undefined>;
  list: () => Promise<User[]>;
  save: (User) => Promise<void>;
}
