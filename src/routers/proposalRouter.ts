import { Router } from "express";

import { createProposal, getProposalsByCompany, getProposalsCompany } from "../controllers/proposalController.js";
import authUserOrCompany from "../middlewares/authMiddleware.js";
import validationSchema from "../middlewares/schemaMiddleware.js";
import schemaProposal from "../schemas/schemaProposal.js";

const proposalRouter = Router();

proposalRouter.post('/proposal', validationSchema(schemaProposal), authUserOrCompany, createProposal);
proposalRouter.get('/proposals/company/:id', authUserOrCompany, getProposalsByCompany);
proposalRouter.get('/proposals/user', authUserOrCompany, getProposalsCompany);

export default proposalRouter;
