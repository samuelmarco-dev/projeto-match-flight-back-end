import { ProposalBody } from './../interfaces/index';
import prisma from "../config/database.js";
import { TypeProposal } from "../interfaces/index.js";

export async function findProposalCompany(companyId: number, dateId: number, type: TypeProposal, destiny: string, name: string){
    return await prisma.proposal.findUnique({
        where: { companyId_dateId_type_destiny_name: { companyId, dateId, type, destiny, name } }
    });
}

export async function createProposalCompany(proposal: ProposalBody){
    await prisma.proposal.create({
        data: { ...proposal }
    });
}

export async function findManyByCompany(id: number){
    return await prisma.proposal.findMany({
        where: { companyId: id, isActive: true }
    });
}

export async function findAllProposals(){
    return await prisma.proposal.findMany({
        where: { isActive: true }
    });
}

const proposalRepository = {
    findProposalCompany,
    createProposalCompany,
    findManyByCompany,
    findAllProposals
}

export default proposalRepository;
