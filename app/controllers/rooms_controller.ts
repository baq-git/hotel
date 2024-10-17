import RoomService from '#services/room_service';
import type { HttpContext } from '@adonisjs/core/http';

export default class RoomsController {
  async index({ view, request }: HttpContext) {
    const { floor, roomTypeId, status, roomNumber } = request.qs();
    const rooms = await RoomService.getFilteredList({ floor, roomTypeId, status, roomNumber });
    return view.render('pages/rooms/index', { rooms });
  }

  async show({ params, view }: HttpContext) {
    const { id } = params;
    const room = await RoomService.getRoomById(id);
    return view.render('pages/rooms/show', { room });
  }
}
