import prisma from '../database/database';

async function findById(id: number) {
  return await prisma.categories.findUnique({ where: { id } });
}

export { findById };
