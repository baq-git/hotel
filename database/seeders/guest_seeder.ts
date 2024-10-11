import Guest from '#models/guest';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { faker } from '@faker-js/faker';

export default class extends BaseSeeder {
  async run() {
    await Guest.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    });
  }
}

