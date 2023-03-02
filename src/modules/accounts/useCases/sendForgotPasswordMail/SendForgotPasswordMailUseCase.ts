import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import IUsersTokensRepository from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/EmailProvider/IMailProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
export default class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRespository: IUsersRepository,
    @inject('UsersTokensRepository')
    private UsersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private emailProvider: IMailProvider
  ) {}
  async execute(email: string) {
    const user = await this.usersRespository.findByEmail(email);

    const templatePath = resolve(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs');

    if (!user) {
      throw new AppError('User does not exists!');
    }

    const token = uuidV4();

    const expires_date = this.dateProvider.addHours(3);

    await this.UsersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.emailProvider.sendMail(email, 'Recuperação de senha', variables, templatePath);
  }
}
