import { Request, Response } from "express";

import { emailIncludesUpperCase, verifyReqBody } from "../utils/errorReqBody.js";
import { CompanyData, Login } from '../interfaces/index.js';
import companyService from "../services/companyService.js";

export async function createCompany(req: Request, res: Response){
    const { name, url, city, state, cnpj, type, email, password, confirmPassword }: CompanyData = req.body;
    verifyReqBody(req.body);
    emailIncludesUpperCase(email);

    await companyService.createCompany({ name, url, city, state, cnpj, email, password, confirmPassword }, type);
    res.sendStatus(201);
}

export async function loginCompany(req: Request, res: Response){
    const { email, password }: Login = req.body;
    verifyReqBody(req.body);
    emailIncludesUpperCase(email);

    const token = await companyService.loginCompany({ email, password });
    res.status(200).send(token);
}
