import { Router } from 'express';

import ResetPasswordUserController from '@modules/accounts/useCases/resetPassword/ResetPasswordUserController';
import SendForgotPasswordMailController from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailControlller';

export const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordUserController.handle);
