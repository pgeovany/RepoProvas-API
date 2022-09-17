import prisma from '../src/database/database';
import supertest from 'supertest';
import app from '../src/app';
import userFactory from './factories/userFactory';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('POST /sign-up', () => {
  it('Should return status 201 given valid params', async () => {
    const user = userFactory();

    const result = await supertest(app)
      .post('/sign-up')
      .send({ ...user, confirmPassword: user.password });

    expect(result.status).toEqual(201);
  });

  it('Should return status 422 given invalid params', async () => {
    const result = await supertest(app).post('/sign-up').send({});

    expect(result.status).toEqual(422);
  });

  it('Should return status 409 given a duplicate email', async () => {
    const user = userFactory();

    await supertest(app)
      .post('/sign-up')
      .send({ ...user, confirmPassword: user.password });

    const duplicateUser = await supertest(app)
      .post('/sign-up')
      .send({ ...user, confirmPassword: user.password });

    expect(duplicateUser.status).toEqual(409);
  });
});
