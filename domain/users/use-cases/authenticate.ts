import { IUserRepository } from '../repository/IUserRepository';

export const authenticate = async (
  params: { username: string; password: string },
  dependencies: { userRepository: IUserRepository }
) => {
  return await dependencies.userRepository.findByUsername(params.username, params.password);
};
