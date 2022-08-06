import { Router } from "express";

import authUserOrCompany from "../middlewares/authMiddleware.js";
import validationSchema from "../middlewares/schemaMiddleware.js";
import schemaProposal from "../schemas/schemaProposal.js";

const proposalRouter = Router();

proposalRouter.post('/proposal', authUserOrCompany, validationSchema(schemaProposal));
proposalRouter.get('/company/proposals', authUserOrCompany);
proposalRouter.get('/user/proposals', authUserOrCompany);

export default proposalRouter;
