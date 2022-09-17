import { Request, Response } from 'express';
import httpStatus from '../utils/httpStatus';
import * as testService from '../services/testService';
import { TestInsertData } from '../repositories/testRepository';

async function addTest(req: Request, res: Response) {
  const test: TestInsertData = req.body;

  const createdTest = await testService.insertTest(test);

  res.status(httpStatus.CREATED).send(createdTest);
}

async function getTestsByDisciplines(req: Request, res: Response) {
  const tests = await testService.getTestsByDisciplines();

  res.status(httpStatus.OK).send(tests);
}

async function getTestsByTeachers(req: Request, res: Response) {
  const tests = await testService.getTestsByTeachers();

  res.status(httpStatus.OK).send(tests);
}

export { addTest, getTestsByDisciplines, getTestsByTeachers };
