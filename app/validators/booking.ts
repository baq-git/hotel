import vine from '@vinejs/vine';

export const createBookingValidator = vine.compile(
  vine.object({
    userId: vine.number(),
    roomId: vine.number(),
    totalPrice: vine.number(),
    checkinDate: vine.date(),
    checkoutDate: vine.date(),
  })
);
