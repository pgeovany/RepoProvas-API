import { faker } from '@faker-js/faker';

function userFactory() {
  return {
    email: faker.internet.email(),
    password: 'Abc@1234',
  };
}

export default userFactory;
