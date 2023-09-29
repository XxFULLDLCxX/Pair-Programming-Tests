import prisma from '../config/database';
import { FruitInput } from '../services/fruits-service';

export type Fruit = {
  id: number;
  name: string;
  price: number;
};

async function getFruits() {
  const fruits = await prisma.fruit.findMany();
  return fruits;
}

async function getSpecificFruit(id: number): Promise<Fruit | undefined> {
  const fruits = await prisma.fruit.findUnique({ where: { id } });
  return fruits;
}

async function getSpecificFruitByName(name: string): Promise<Fruit | undefined> {
  const fruits = await prisma.fruit.findFirst({
    where: { name: { equals: name, mode: 'insensitive' } },
  });
  return fruits;
}

async function insertFruit(fruit: FruitInput) {
  return await prisma.fruit.create({ data: fruit });
}

const fruitsRepository = {
  getFruits,
  getSpecificFruit,
  getSpecificFruitByName,
  insertFruit,
};

export default fruitsRepository;
