const RoomsController = () => import('#controllers/rooms_controller');
import router from '@adonisjs/core/services/router';
const HomeController = () => import('#controllers/home_controller');

router.get('/', [HomeController, 'index']).as('home.index');
router.get('/search', [HomeController, 'search']).as('home.search');

router.group(() => {
  router.get('/rooms', [RoomsController, 'index']).as('rooms.index');
  router.get('rooms/:id', [RoomsController, 'show']).as('rooms.show');
});
