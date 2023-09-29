import app from '../src/app';
import supertest from 'supertest';
import prisma from '../src/config/database';
import { buildFruit, generateFruit } from './factories/fruits.factory';

const api = supertest(app);

beforeEach(async () => {
  await prisma.fruit.deleteMany();
});

describe('POST /fruits', () => {
  it('should return 422 when inserting a fruit with data missing', async () => {
    const fruit = await buildFruit();
    const result0 = await api.post('/fruits');
    expect(result0.status).toBe(422);

    const result1 = await api.post('/fruits').send({ name: fruit.name });
    expect(result1.status).toBe(422);

    const result2 = await api.post('/fruits').send({ price: fruit.price });
    expect(result2.status).toBe(422);
  });

  it('should return 409 when inserting a fruit that is already registered', async () => {
    const fruit = await buildFruit();
    const { status } = await api.post('/fruits').send({ name: fruit.name, price: fruit.price });
    expect(status).toBe(409);
  });

  it('should return 201 when inserting a fruit', async () => {
    const fruit = generateFruit();
    const { status, body } = await api.post('/fruits').send(fruit);
    expect(status).toBe(201);
    expect(body).toEqual(expect.objectContaining(fruit));
  });
});

describe('GET /fruits', () => {
  it(`shoud return 404 when trying to get a fruit by an id that doesn't exist`, async () => {
    const fruit = await buildFruit();
    const { status } = await api.get(`/fruits/${fruit.id + 1}`);
    expect(status).toBe(404);
  });

  it('should return 400 when id param is present but not valid', async () => {
    const id = NaN;
    const { status } = await api.get(`/fruits/${id}`);
    expect(status).toBe(400);
  });

  it('should return one fruit when given a valid and existing id', async () => {
    const fruit = await buildFruit();
    const { status, body } = await api.get(`/fruits/${fruit.id}`);
    expect(status).toBe(200);
    expect(body).toEqual(fruit);
  });

  it('should return all fruits if no id is present', async () => {
    await buildFruit();
    await buildFruit();
    const { status, body } = await api.get(`/fruits`);
    expect(status).toBe(200);
    expect(body).toHaveLength(2);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: expect.any(Number), name: expect.any(String), price: expect.any(Number) }),
      ])
    );
  });
});
