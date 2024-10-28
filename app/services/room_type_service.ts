import RoomType from '#models/room_type';

export default class RoomTypeService {
  static getRoomTypes() {
    return RoomType.all();
  }

  static getRoomType(id: string | number) {
    return RoomType.query().where({ id }).preload('rooms');
  }
}
