import { Router } from 'express';
import { addTest } from '../controllers/testController';
import validateSchema from '../middlewares/schemaValidator';
import validateToken from '../middlewares/tokenValidator';
import { testSchema } from '../utils/schemas';

const testRouter = Router();

testRouter.use(validateToken);
testRouter.post('/tests', validateSchema(testSchema), addTest);

export default testRouter;
