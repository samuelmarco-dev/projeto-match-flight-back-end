import prisma from "../config/database.js";

export async function findAirline(airline: string, initials: string){
    return await prisma.airline.findUnique({
        where: { name_initials: { name: airline, initials } }
    });
}

export async function createAirline(airline: string, initials: string){
    await prisma.airline.create({
        data: { name: airline, initials }
    });
}

const airlineRepository = {
    findAirline,
    createAirline
}

export default airlineRepository;
