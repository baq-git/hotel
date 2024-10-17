import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';
import Roles from '#enums/roles';
import { Exception } from '@adonisjs/core/exceptions';

/**
 * Admin middleware is used authorized if user is admin or not to perform specific actions.
 */

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const isAdmin = ctx.auth.user?.roleId === Roles.ADMIN;

    if (!isAdmin) {
      throw new Exception('You are not authorized to perform this action', {
        code: 'E_NOT_AUTHORIZED',
        status: 401,
      });
    }

    const output = await next();
    return output;
  }
}

