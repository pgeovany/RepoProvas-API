import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { UserInsertData } from '../repositories/userRepository';
import httpStatus from '../utils/httpStatus';

async function signUp(req: Request, res: Response) {
  const { email, password }: UserInsertData = req.body;

  await authService.createAccount(email, password);

  res.sendStatus(httpStatus.CREATED);
}

async function signIn(req: Request, res: Response) {
  const { email, password }: UserInsertData = req.body;

  const token = await authService.login(email, password);

  res.status(httpStatus.OK).send({ token });
}

export { signUp, signIn };
