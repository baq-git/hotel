import vine from '@vinejs/vine';

export const searchRoomValidator = vine.compile(
  vine.object({
    floor: vine.union([
      vine.union.if((value) => typeof value === 'string', vine.string()),
      vine.union.if(
        (value) => Array.isArray(value) && value.every((item) => typeof item === 'string'),
        vine.array(vine.string())
      ),
    ]),
    roomTypeId: vine.number().withoutDecimals().optional(),
    status: vine.string().optional(),
    roomNumber: vine.string().optional(),
  })
);
