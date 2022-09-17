import prisma from '../database/database';
import { Tests } from '@prisma/client';

export type TestInsertData = Omit<Tests, 'id'>;

async function create(data: TestInsertData) {
  return await prisma.tests.create({ data });
}

async function getTestsGroupedByDisciplines() {
  return await prisma.terms.findMany({
    select: {
      number: true,
      Disciplines: {
        select: {
          id: true,
          name: true,
          TeachersDisciplines: {
            select: {
              teacher: true,
              Tests: {
                distinct: ['categoryId'],
                select: {
                  category: {
                    select: {
                      id: true,
                      name: true,
                      Tests: {
                        select: {
                          id: true,
                          name: true,
                          pdfUrl: true,
                        },
                      },
                    },
                  },
                },
                orderBy: [
                  {
                    category: {
                      name: 'desc',
                    },
                  },
                ],
              },
            },
          },
        },
      },
    },
  });
}

export { create, getTestsGroupedByDisciplines };
