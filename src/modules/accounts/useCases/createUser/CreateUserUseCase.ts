import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRespository: IUsersRepository
  ) {}

  async execute({ name, driver_license, email, password }: ICreateUserDTO): Promise<void> {
    const userAlreadyExist = await this.userRespository.findByEmail(email);

    if (userAlreadyExist) {
      throw new AppError('User already exist');
    }

    const passwordHash = await hash(password, 8);

    await this.userRespository.create({
      name,
      driver_license,
      email,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
