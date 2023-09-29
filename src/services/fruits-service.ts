import { conflictError } from "../errors/conflict-error";
import { notFoundError } from "../errors/notfound-error";
import fruitsRepository, { Fruit } from "../repositories/fruits-repository";

export type FruitInput = Omit<Fruit, "id">;

function getFruits() {
  return fruitsRepository.getFruits();
}

async function getSpecificFruit(id: number) {
  const fruit = await fruitsRepository.getSpecificFruit(id);
  if (!fruit) {
    throw notFoundError();
  }

  return fruit;
}

async function createFruit(fruit: FruitInput): Promise<Fruit> {
  const fruitAlreadyRegistered = await fruitsRepository.getSpecificFruitByName(fruit.name);
  if (fruitAlreadyRegistered) {
    throw conflictError();
  }

  return fruitsRepository.insertFruit(fruit);
}

const fruitsService = {
  getFruits,
  getSpecificFruit,
  createFruit
}

export default fruitsService;