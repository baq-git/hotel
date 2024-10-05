import Room from '#models/room';
import { searchRoomValidator } from '#validators/room_search_validator';
import { Infer } from '@vinejs/vine/types';

export default class RoomService {
  static sortOptions() {}

  static getFilteredList(filters: Infer<typeof searchRoomValidator>) {
    const { roomTypeId, roomNumber, status, floor } = filters;

    return Room.query()
      .if(floor, (query) => query.whereIn('floor', [...floor]))
      .if(roomTypeId, (query) => query.where({ roomTypeId }))
      .if(status, (query) => query.whereILike('status', `%${status}%`))
      .if(roomNumber, (query) => query.whereILike('roomNumber', `%${roomNumber}%`))
      .preload('roomType')
      .orderBy('roomNumber', 'desc');
  }

  static getDistinct(property: string) {
    return Room.query().distinct(property);
  }
}
