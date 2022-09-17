import prisma from '../src/database/database';
import supertest from 'supertest';
import app from '../src/app';
import userFactory from './factories/userFactory';
import encrypt from '../src/utils/encrypt';

async function getToken() {
  const user = await createUser();
  const result = await supertest(app).post('/sign-in').send(user);

  return result.body.token;
}

async function createUser() {
  const user = userFactory();

  const data = {
    email: user.email,
    password: await encrypt(user.password),
  };

  await prisma.users.create({ data });

  return user;
}

export default getToken;
