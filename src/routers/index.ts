import { Router } from 'express';

import userRouter from './userRouter.js';
import companyRouter from './companyRouter.js';
import proposalRouter from './proposalRouter.js';

const router = Router();

router.use('/user', userRouter);
router.use('/company', companyRouter);
router.use(proposalRouter);

export default router;
