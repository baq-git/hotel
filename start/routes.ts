import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';

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
