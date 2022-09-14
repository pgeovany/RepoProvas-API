import * as categoryRepository from '../repositories/categoryRepository';

async function findByIdOrFail(id: number) {
  const category = await categoryRepository.findById(id);

  if (!category) {
    throw {
      type: 'NOT_FOUND',
      message: 'Category not found!',
    };
  }

  return category;
}

export { findByIdOrFail };
