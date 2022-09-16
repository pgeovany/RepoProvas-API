import { Request, Response } from 'express';
import httpStatus from '../utils/httpStatus';
import * as testService from '../services/testService';
import { TestInsertData } from '../repositories/testRepository';

async function addTest(req: Request, res: Response) {
  const test: TestInsertData = req.body;

  const createdTest = await testService.insertTest(test);

  res.status(httpStatus.CREATED).send(createdTest);
}

export { addTest };