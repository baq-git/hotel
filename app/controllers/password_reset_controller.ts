import type { HttpContext } from '@adonisjs/core/http';
import { emailResetPasswordValidator, passwordResetPasswordValidator } from '#validators/auth';
import User from '#models/user';
import PasswordResetToken from '#models/password_reset_token';
import router from '@adonisjs/core/services/router';
import mail from '@adonisjs/mail/services/main';
import env from '#start/env';
import logger from '@adonisjs/core/services/logger';

export default class PasswordResetController {
  async forgot({ view }: HttpContext) {
    return view.render('pages/auth/password_forgot');
  }

  async send({ session, request, response }: HttpContext) {
    const { email } = await request.validateUsing(emailResetPasswordValidator);
    const user = await User.findBy('email', email);
    const token = await PasswordResetToken.generatePasswordResetToken(user);
    const resetLink = router.makeUrl('auth.password.reset', [token]);

    if (user) {
      mail.sendLater((message) => {
        message
          .from('noreply@ori.com')
          .to(user.email)
          .subject('[OriHotel] - Reset your Password')
          .html(`Reset password <a href="${env.get('DOMAIN')}${resetLink}">click here</a>`);
      });

      session.flash('notification', {
        type: 'success',
        message: 'Check your email to receive the reset link',
      });

      return response.redirect().back();
    }

    if (!user) {
      session.flash('notification', {
        type: 'error',
        message: 'Could not find your email, please try again.',
      });

      return response.redirect().back();
    }
  }

  async reset({ view, params }: HttpContext) {
    const { token } = params;
    const isValid = await PasswordResetToken.verify(token);
    return view.render('pages/auth/password_reset', { isValid, token });
  }

  async store({ request, response, session, auth }: HttpContext) {
    const { password, token } = await request.validateUsing(passwordResetPasswordValidator);

    const user = await PasswordResetToken.getPasswordResetUser(token);

    if (!user) {
      session.flash('notification', {
        type: 'error',
        message: 'Token expired or associated user could not be found',
      });
      return response.redirect().back();
    }

    await user.merge({ password }).save();
    await auth.use('web').login(user);
    await PasswordResetToken.expirePasswordResetTokens(user);

    return response.redirect().toPath('/');
  }
}
