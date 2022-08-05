import { Router } from "express";

import { createCompany, loginCompany } from "../controllers/companyController";
import validationSchema from "../middlewares/schemaMiddleware.js";
import schemaCompany from "../schemas/schemaCompany.js";
import schemaLogin from "../schemas/schemaLogin.js";

const companyRouter = Router();

companyRouter.post('/sign-up', validationSchema(schemaCompany), createCompany);
companyRouter.post('/sign-in', validationSchema(schemaLogin), loginCompany);

export default companyRouter;
