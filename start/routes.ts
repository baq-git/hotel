const RoomsController = () => import('#controllers/rooms_controller');
const RegisterController = () => import('#controllers/auth/register_controller');
const LoginController = () => import('#controllers/auth/login_controller');
const LogoutController = () => import('#controllers/auth/logout_controller');
import router from '@adonisjs/core/services/router';
const HomeController = () => import('#controllers/home_controller');

router.get('/', [HomeController, 'index']).as('home.index');
router.get('/search', [HomeController, 'search']).as('home.search');

router.group(() => {
  router.get('/rooms', [RoomsController, 'index']).as('rooms.index');
  router.get('rooms/:id', [RoomsController, 'show']).as('rooms.show');
});

router
  .group(() => {
    router.get('/register', [RegisterController, 'show']).as('register.show');
    router.post('/register', [RegisterController, 'store']).as('register.store');

    router.post('/logout', [LogoutController, 'handle']).as('logout');

    router.get('/login', [LoginController, 'show']).as('login.show');
    router.post('/login', [LoginController, 'store']).as('login.store');
  })
  .as('auth');
