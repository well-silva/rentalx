import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordUserUseCase from './ResetPasswordUserUseCase';

export default class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const resetPassWordUserUseCase = container.resolve(ResetPasswordUserUseCase);

    const { token } = request.query;
    const { password } = request.body;

    await resetPassWordUserUseCase.execute({ token: String(token), password });

    return response.send();
  }
}
