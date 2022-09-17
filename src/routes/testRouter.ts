import { Router } from 'express';
import {
  addTest,
  getTestsByDisciplines,
  getTestsByTeachers,
} from '../controllers/testController';
import validateSchema from '../middlewares/schemaValidator';
import validateToken from '../middlewares/tokenValidator';
import { testSchema } from '../utils/schemas';

const testRouter = Router();

testRouter.use(validateToken);
testRouter.post('/tests', validateSchema(testSchema), addTest);
testRouter.get('/tests/disciplines', getTestsByDisciplines);
testRouter.get('/tests/teachers', getTestsByTeachers);

export default testRouter;
