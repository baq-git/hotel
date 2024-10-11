document.addEventListener('alpine:init', () => {
  Alpine.data('bookingSummary', (data) => {
    const { roomTotalPrice } = data;
    return {
      roomTotal: roomTotalPrice,
      discount: 10,
      taxes: 10,
      extraValues: [],
      get extras() {
        return this.extraValues.reduce((a, c) => a + c, 0);
      },
      get subTotal() {
        return this.roomTotal + this.extras;
      },
      get total() {
        return (this.subTotal * (1 - this.discount / 100) - this.taxes).toFixed(2);
      },
    };
  });
});
