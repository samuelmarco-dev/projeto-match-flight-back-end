import prisma from "../config/database.js";

export async function findAirportLanding(name: string, initials: string){
    return await prisma.airPortLanding.findUnique({
        where: { name_initials: { name, initials } }
    });
}

export async function createAirportLanding(name: string, initials: string){
    await prisma.airPortLanding.create({
        data: { name, initials }
    });
}

const landingRepository = {
    findAirportLanding,
    createAirportLanding
}

export default landingRepository;
