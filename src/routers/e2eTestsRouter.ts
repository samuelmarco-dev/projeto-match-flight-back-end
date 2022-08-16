import { Router } from "express";
import { deleteAllCompanies, deleteAllProposals, deleteAllUsers } from "../controllers/e2eTestsController";

const e2eTestsRouter = Router();

e2eTestsRouter.get("/user/reset", deleteAllUsers);
e2eTestsRouter.get("/company/reset", deleteAllCompanies);
e2eTestsRouter.get("/proposal/reset", deleteAllProposals);

export default e2eTestsRouter;
