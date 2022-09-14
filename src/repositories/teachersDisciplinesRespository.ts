import prisma from '../database/database';

async function findById(id: number) {
  return await prisma.teachersDisciplines.findUnique({ where: { id } });
}

export { findById };
