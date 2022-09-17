import prisma from '../src/database/database';
import supertest from 'supertest';
import app from '../src/app';
import userFactory from './factories/userFactory';
import encrypt from '../src/utils/encrypt';

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

describe('POST /sign-in', () => {
  it('Should return status 422 given invalid params', async () => {
    const result = await supertest(app).post('/sign-in').send({});

    expect(result.status).toEqual(422);
  });

  it('Should return status 401 given an invalid user', async () => {
    const user = userFactory();

    const result = await supertest(app).post('/sign-in').send(user);

    expect(result.status).toEqual(401);
  });

  it('Should return status 200 and a token given a valid user', async () => {
    const user = userFactory();

    const data = {
      email: user.email,
      password: await encrypt(user.password),
    };

    await prisma.users.create({ data });

    const result = await supertest(app).post('/sign-in').send(user);

    expect(result.body.token).not.toBeUndefined();
    expect(result.status).toEqual(200);
  });
});
