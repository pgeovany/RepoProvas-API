import * as userRepository from '../repositories/userRepository';
import encrypt from '../utils/encrypt';

async function createAccount(email: string, password: string) {
  const userExists = await userRepository.findByEmail(email);

  if (userExists) {
    throw {
      type: 'CONFLICT',
      message: 'This email is already registered!',
    };
  }

  const passwordHash = await encrypt(password);
  await userRepository.create({ email, password: passwordHash });
}

export { createAccount };
