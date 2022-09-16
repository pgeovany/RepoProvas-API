import prisma from '../database/database';
import { Tests } from '@prisma/client';

export type TestInsertData = Omit<Tests, 'id'>;

async function create(data: TestInsertData) {
  return await prisma.tests.create({ data });
}

export { create };
