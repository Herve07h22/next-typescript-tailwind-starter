import { User } from "../entities/Users";
import { IUserRepository } from "../repository/IUserRepository";

export class UserRepositoryTest implements IUserRepository {
    _users : User[];
    constructor (withNoOne?:boolean) {
        this._users = withNoOne ? [] : [{ id: 101, name: 'Alice' },
        { id: 102, name: 'Bob' },
        { id: 103, name: 'Caroline' },
        { id: 104, name: 'Dave' },
        { id: 105, name: 'Bob' },
    ]
    }
    async get (id: number) {
        return this._users.find(u => u.id === id)
    }
    async list () {
        return this._users
    }
    
}