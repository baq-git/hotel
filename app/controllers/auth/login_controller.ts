import User from '#models/user';
import { loginValidator } from '#validators/auth';
import type { HttpContext } from '@adonisjs/core/http';
import logger from '@adonisjs/core/services/logger';

export default class LoginController {
  async show({ view }: HttpContext) {
    return view.render('pages/auth/login');
  }

  async store({ auth, response, request }: HttpContext) {
    const { email, password, isRememberMe } = await request.validateUsing(loginValidator);
    const user = await User.verifyCredentials(email, password);
    await auth.use('web').login(user, isRememberMe);

    return response.redirect().toRoute('home.index');
  }
}
