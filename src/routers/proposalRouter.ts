import { Router } from "express";

import { createProposal, getProposalsByCompany, getProposalsCompany } from "../controllers/proposalController.js";
import authUserOrCompany from "../middlewares/authMiddleware.js";
import validationSchema from "../middlewares/schemaMiddleware.js";
import schemaProposal from "../schemas/schemaProposal.js";

const proposalRouter = Router();

proposalRouter.post('/proposal', authUserOrCompany, validationSchema(schemaProposal), createProposal);
proposalRouter.get('/company/proposals', authUserOrCompany, getProposalsByCompany);
proposalRouter.get('/user/proposals', authUserOrCompany, getProposalsCompany);

export default proposalRouter;
