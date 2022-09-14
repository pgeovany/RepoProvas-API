import { Router } from 'express';
import validateSchema from '../middlewares/schemaValidator';
import { signUpSchema } from '../utils/schemas';
import { signUp } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/sign-up', validateSchema(signUpSchema), signUp);

export default authRouter;
