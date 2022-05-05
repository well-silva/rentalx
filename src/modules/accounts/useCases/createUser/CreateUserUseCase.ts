import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

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
