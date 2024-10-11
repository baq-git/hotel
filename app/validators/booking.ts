import vine from '@vinejs/vine';

export const createBookingValidator = vine.compile(
  vine.object({
    guestId: vine.number(),
    roomId: vine.number(),
    totalPrice: vine.number(),
    checkinDate: vine.date(),
    checkoutDate: vine.date(),
  })
);
