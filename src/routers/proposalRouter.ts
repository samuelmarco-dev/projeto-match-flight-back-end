import { Router } from "express";

const proposalRouter = Router();

proposalRouter.post('/proposal');
proposalRouter.post('/company/proposals');
proposalRouter.get('/user/proposals');

export default proposalRouter;
