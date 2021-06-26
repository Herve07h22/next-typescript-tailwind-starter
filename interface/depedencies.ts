import { IUserRepository } from "../domain/users/repository/IUserRepository";
import { UserRepositoryTest } from "../domain/users/tests/UserRepositoryTest";

export interface IDependencies {
    userRepository : IUserRepository
}

export const dependencies:IDependencies = {
    userRepository : new UserRepositoryTest()
}


