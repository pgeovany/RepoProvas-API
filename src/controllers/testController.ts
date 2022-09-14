import { Request, Response } from 'express';
import httpStatus from '../utils/httpStatus';
import * as testService from '../services/testService';
import { TestInsertData } from '../repositories/testRepository';

async function addTest(req: Request, res: Response) {
  const test: TestInsertData = req.body;

  await testService.insertTest(test);

  res.sendStatus(httpStatus.CREATED);
}

export { addTest };
