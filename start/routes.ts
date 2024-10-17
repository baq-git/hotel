import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';
const PasswordResetController = () => import('#controllers/password_reset_controller');

const RoomsController = () => import('#controllers/rooms_controller');
const RegisterController = () => import('#controllers/auth/register_controller');
const LoginController = () => import('#controllers/auth/login_controller');
const LogoutController = () => import('#controllers/auth/logout_controller');
const BookingsController = () => import('#controllers/bookings_controller');
const HomeController = () => import('#controllers/home_controller');

router.get('/', [HomeController, 'index']).as('home.index');
router.get('/search', [HomeController, 'search']).as('home.search');

router
  .group(() => {
    router.get('/register', [RegisterController, 'show']).as('register.show');
    router.post('/register', [RegisterController, 'store']).as('register.store');

    router.post('/logout', [LogoutController, 'handle']).as('logout');

    router.get('/login', [LoginController, 'show']).as('login.show').use(middleware.guest());
    router.post('/login', [LoginController, 'store']).as('login.store').use(middleware.guest());

    router.get('/password/forgot', [PasswordResetController, 'forgot']).as('password.forgot');
    router.post('/password/send', [PasswordResetController, 'send']).as('password.send');
    router.get('/password/reset', [PasswordResetController, 'reset']).as('password.reset');
    router.post('/password/store', [PasswordResetController, 'store']).as('password.store');
  })
  .as('auth');

router
  .group(() => {
    router.get('/rooms', [RoomsController, 'index']).as('index');
    router.get('/rooms/:id', [RoomsController, 'show']).as('show');
  })
  .as('rooms');

router.resource('/bookings', BookingsController).use('*', middleware.auth());

router
  .get('/getBookingsByRoomId/:roomId', [BookingsController, 'getBookingsInRoom'])
  .as('getBookingsByRoomId');
