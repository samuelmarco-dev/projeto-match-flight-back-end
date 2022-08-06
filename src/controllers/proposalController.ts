import { SessionCompany, SessionUser } from '@prisma/client';
import { Request, Response } from "express";

import { ProposalData, TypeSession } from "../interfaces/index.js";
import proposalService from '../services/proposalService.js';
import { verifyReqBody } from "../utils/errorReqBody.js";
import { unauthorizedError } from '../utils/errorUtils.js';

export async function createProposal(req: Request, res: Response){
    const session: SessionCompany = res.locals.session;
    const typeAuth: TypeSession = res.locals.type;
    const { companyId, airline, boarding, landing, start, end, name, destiny, type, year }: ProposalData = req.body;

    if(!typeAuth || typeAuth !== 'companyId') throw unauthorizedError('You are not authorized to create a proposal');
    verifyReqBody(req.body);

    const message = 'The identification of the company in the authentication does not match';
    if (session.companyId !== companyId) return res.status(401).send(message);

    await proposalService.createProposal({ companyId, airline, boarding, landing, start, end, name, destiny, year }, type);
    res.sendStatus(201);
}

export async function getProposalsByCompany(req: Request, res: Response){
    const session: SessionCompany = res.locals.session;
    const typeAuth: TypeSession = res.locals.type;
    const { id } = req.params;

    const message = 'The identification of the company in the authentication does not match';
    if(!typeAuth || typeAuth !== 'companyId') throw unauthorizedError('You are not authorized to create a proposal');
    if(session.companyId !== Number(id)) return res.status(401).send(message);

    const proposals = await proposalService.getProposalsByCompany(Number(id));
    res.status(200).send(proposals);
}

export async function getProposalsCompany(req: Request, res: Response){
    const session: SessionUser = res.locals.session;
    const typeAuth: TypeSession = res.locals.type;

    if(!typeAuth || typeAuth !== 'userId') throw unauthorizedError('You are not authorized to create a proposal');

    const proposals = await proposalService.getProposalsOfferedByCompanies();
    res.status(200).send(proposals);
}
