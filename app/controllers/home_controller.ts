import type { HttpContext } from '@adonisjs/core/http';
import RoomService from '#services/room_service';
import RoomType from '#models/room_type';

export default class HomeController {
  async index({ view, request, auth }: HttpContext) {
    await auth.check();
    const { floor, roomTypeId, status, roomNumber } = request.qs();
    const rooms = await RoomService.getFilteredList({ floor, roomTypeId, status, roomNumber });
    const roomStatuses = await RoomService.getDistinct('status');
    const roomFloors = await RoomService.getDistinct('floor');
    const roomTypes = await RoomType.all();

    return view.render('pages/home', { rooms, roomStatuses, roomFloors, roomTypes });
  }

  async search({ view, request }: HttpContext) {
    const { floor, roomTypeId, status, roomNumber } = request.qs();
    const rooms = await RoomService.getFilteredList({ floor, roomTypeId, status, roomNumber });

    return view.render('components/home/room/board', { rooms });
  }
}
