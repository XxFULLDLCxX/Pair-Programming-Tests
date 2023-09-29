import fruitsRepository from 'repositories/fruits-repository';
import { FruitInput } from 'services/fruits-service';
import { faker } from '@faker-js/faker';
import { Fruit } from '@prisma/client';

export function generateFruit() {
  const fruit: FruitInput = {
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
  };
  return fruit;
}

export async function buildFruit(): Promise<Fruit> {
  const fruit = generateFruit();
  return await fruitsRepository.insertFruit(fruit);
}
