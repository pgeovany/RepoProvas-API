import * as testRepository from '../repositories/testRepository';
import * as categoryService from './categoryService';
import * as teachersDisciplinesService from './teachersDisciplinesService';

async function insertTest(test: testRepository.TestInsertData) {
  await categoryService.findByIdOrFail(test.categoryId);
  await teachersDisciplinesService.findByIdOrFail(test.teacherDisciplineId);

  return await testRepository.create(test);
}

export { insertTest };
