import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Hotel from '#models/hotel';

export default class extends BaseSeeder {
  static environment = ['development', 'testing'];

  async run() {
    await Hotel.create({
      name: 'Ori',
      address: '1000 W 20th Ave, Baltimore, Maryland',
      phone: '0447917239377',
      email: 'ori@hotelmail.com',
    });
  }
}
