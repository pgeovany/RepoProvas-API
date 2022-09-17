import { faker } from '@faker-js/faker';

function testFactory() {
  return {
    name: faker.lorem.words(3),
    pdfUrl: faker.internet.url(),
    categoryId: 1,
    teacherDisciplineId: 1,
  };
}

export default testFactory;
