import type { HttpContext } from '@adonisjs/core/http';
import { resetPasswordValidator } from '#validators/auth';
import User from '#models/user';
import PasswordResetToken from '#models/password_reset_token';
import router from '@adonisjs/core/services/router';
import mail from '@adonisjs/mail/services/main';
import env from '#start/env';
import logger from '@adonisjs/core/services/logger';

export default class PasswordResetController {
  async forgot({ view }: HttpContext) {
    return view.render('pages/auth/password_reset');
  }

  async send({ session, request, response }: HttpContext) {
    const { email } = await request.validateUsing(resetPasswordValidator);
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
    }
    session.flash(
      'success',
      'If an account matches the provided email, you will recieve a password reset link shortly'
    );
    return response.redirect().back();
  }

  async reset({ view, params }: HttpContext) {
    const token = params.token;
    const isValid = PasswordResetToken.verify(token);

    return view.render('pages/auth/password_reset', { isValid, token });
  }

  async store({ }: HttpContext) { }
}
