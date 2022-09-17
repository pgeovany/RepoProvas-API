import prisma from '../src/database/database';
import supertest from 'supertest';
import app from '../src/app';
import testFactory from './factories/testFactory';
import getToken from './getToken';

describe('POST /tests', () => {
  it('Should return status 201 and the created test given valid params', async () => {
    const test = testFactory();
    const token = await getToken();

    const result = await supertest(app)
      .post('/tests')
      .set('Authorization', `Bearer ${token}`)
      .send(test);

    const createdTest = await prisma.tests.findUnique({
      where: { id: result.body.id },
    });

    expect(result.status).toEqual(201);
    expect(createdTest).not.toBeNull();
  });

  it('Should return status 422 given invalid params', async () => {
    const token = await getToken();

    const result = await supertest(app)
      .post('/tests')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(result.status).toEqual(422);
  });

  it('Should return status 400 when missing authorization header', async () => {
    const test = testFactory();

    const result = await supertest(app).post('/tests').send(test);

    expect(result.status).toEqual(400);
  });

  it('Should return status 401 given invalid token', async () => {
    const test = testFactory();

    const result = await supertest(app)
      .post('/tests')
      .set('Authorization', 'token')
      .send(test);

    expect(result.status).toEqual(401);
  });
});
