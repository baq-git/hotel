import Room from '#models/room';
import RoomService from '#services/room_service';
import type { HttpContext } from '@adonisjs/core/http';
import logger from '@adonisjs/core/services/logger';

export default class RoomsController {
  async index({ view, request }: HttpContext) {
    const { floor, roomTypeId, status, roomNumber } = request.qs();
    const rooms = await RoomService.getFilteredList({ floor, roomTypeId, status, roomNumber });
    return view.render('pages/rooms/index', { rooms });
  }

  async show({ params, view }: HttpContext) {
    const { id } = params;
    const room = await Room.query().where('id', id).preload('hotel').preload('roomType').first();

    logger.info(room);

    return view.render('pages/rooms/show', { room });
  }
}
