import { Request, Response } from "express";

import companyService from "../services/companyService.js";
import proposalService from "../services/proposalService.js";
import userService from "../services/userService.js";

export async function deleteAllUsers(req: Request, res: Response){
    await userService.deleteAllUsers();
    res.sendStatus(200);
}

export async function deleteAllCompanies(req: Request, res: Response){
    await companyService.deleteAllCompanies();
    res.sendStatus(200);
}

export async function deleteAllProposals(req: Request, res: Response){
    await proposalService.deleteAllProposals();
    res.sendStatus(200);
}
