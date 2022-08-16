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
        select: {
            id: true,
            destiny: true,
            year: true,
            Image: {
                select: { url: true }
            },
            Date: {
                select: { start: true, end: true }
            },
            Boarding: {
                select: { initials: true }
            },
            Landing: {
                select: { initials: true }
            }
        },
        where: { companyId: id, isActive: true }
    });
}

export async function findAllProposals(){
    return await prisma.proposal.findMany({
        select: {
            id: true,
            destiny: true,
            year: true,
            Image: {
                select: { url: true }
            },
            Date: {
                select: { start: true, end: true }
            },
            Airline: {
                select: { name: true, initials: true }
            },
            Boarding: {
                select: { name: true, initials: true }
            },
            Landing: {
                select: { name: true, initials: true }
            }
        },
        where: { isActive: true }
    });
}

export async function deleteAllProposals(){
    await prisma.$executeRaw`TRUNCATE TABLE "proposals" CASCADE;`;
}

const proposalRepository = {
    findProposalCompany,
    createProposalCompany,
    findManyByCompany,
    findAllProposals,
    deleteAllProposals
}

export default proposalRepository;
