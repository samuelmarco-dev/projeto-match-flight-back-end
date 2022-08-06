import prisma from "../config/database.js";

export async function findDateProposal(start: string, end: string){
    return await prisma.dateStartEnd.findUnique({
        where: { start_end: { start, end } }
    });
}

export async function createDateStartEnd(start: string, end: string){
    await prisma.dateStartEnd.create({
        data: { start, end }
    });
}
