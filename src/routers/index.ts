import { Router } from 'express';

import userRouter from './userRouter.js';
import companyRouter from './companyRouter.js';

const router = Router();

router.use('/user', userRouter);
router.use('/company', companyRouter);

export default router;
