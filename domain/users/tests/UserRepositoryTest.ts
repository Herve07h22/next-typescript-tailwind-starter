import { User } from '../entities/Users';
import { IUserRepository } from '../repository/IUserRepository';

export class UserRepositoryTest implements IUserRepository {
  _users: User[];
  _next_user_id: number = 106;
  constructor(withNoOne?: boolean) {
    this._users = withNoOne
      ? []
      : [
          { id: 101, name: 'Alice' },
          { id: 102, name: 'Bob' },
          { id: 103, name: 'Caroline' },
          { id: 104, name: 'Dave' },
          { id: 105, name: 'Bob' },
        ];
  }
  async get(id: number) {
    return this._users.find((u) => u.id === id);
  }
  async list() {
    return this._users;
  }

  async save(user: User | Omit<User, 'id'>) {
    if ('id' in user) {
      // update
      const toUpdate = await this.get(user.id);
      toUpdate && Object.assign(toUpdate, user);
    } else {
      // create
      this._users = [...this._users, { ...user, id: this._next_user_id }];
      this._next_user_id += 1;
    }
  }
}
