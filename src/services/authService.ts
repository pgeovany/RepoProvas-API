import * as userRepository from '../repositories/userRepository';
import encrypt from '../utils/encrypt';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

async function login(email: string, password: string) {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw {
      type: 'UNAUTHORIZED',
      message: 'Invalid email or password!',
    };
  }

  await validatePasswordOrFail(password, user.password);
  return generateToken(user.id);
}

async function validatePasswordOrFail(plainText: string, hash: string) {
  if (bcrypt.compareSync(plainText, hash)) {
    return;
  }

  throw {
    type: 'UNAUTHORIZED',
    message: 'Invalid email or password!',
  };
}

function generateToken(id: number) {
  const TWO_HOURS_IN_SECONDS = 60 * 60 * 2;
  const { JWT_SECRET } = process.env;

  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: TWO_HOURS_IN_SECONDS,
  });

  return token;
}

export { createAccount, login };
