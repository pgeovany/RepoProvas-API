import * as teachersDisciplinesRepository from '../repositories/teachersDisciplinesRespository';

async function findByIdOrFail(id: number) {
  const teacherDiscipline = await teachersDisciplinesRepository.findById(id);

  if (!teacherDiscipline) {
    throw {
      type: 'NOT_FOUND',
      message: 'Teacher and discipline not found!',
    };
  }

  return teacherDiscipline;
}

export { findByIdOrFail };
