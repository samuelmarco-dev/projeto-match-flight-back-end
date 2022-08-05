import { CompanyBody } from './../interfaces/index.js';
import prisma from "../config/database.js";

export async function findCompanyByEmail(email: string){
    return await prisma.company.findUnique({
        where: { email }
    });
}

export async function createCompany(company: CompanyBody){
    await prisma.company.create({
        data: { ...company }
    });
}
