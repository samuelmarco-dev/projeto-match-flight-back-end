import dayjs from 'dayjs';

import * as companyRepository from "../repositories/companyRepository.js";
import * as airlineRepository from "../repositories/airlineRepository.js";
import * as dateRepository from "../repositories/dateRepository.js";
import * as boardingRepository from "../repositories/boardingRepository.js";
import * as landingRepository from "../repositories/landingRepository.js";
import * as proposalRepository from "../repositories/proposalRepository.js";
import { ProposalService, TypeProposal } from "../interfaces/index.js";
import { conflictError, notFoundError, unauthorizedError, wrongSchemaError } from "../utils/errorUtils.js";

async function createProposal(proposal: ProposalService, type: TypeProposal){
    const { companyId, airline, boarding, landing, start, end, name, destiny, year } = proposal;

    const companyFound = await companyRepository.findCompanyById(companyId);
    if(!companyFound) unauthorizedError('Company not found');
    verifyYear(Number(year));

    const [airlineId, dateId, boardingId, landingId] = await Promise.all([
        airlineExistsOrNot(airline), dateExistsOrNot(start, end), boardingExistsOrNot(boarding), landingExistsOrNot(landing)
    ]);

    const proposalFound = await proposalRepository.findProposalCompany(companyId, dateId, type, destiny, name);
    if(proposalFound) throw conflictError('Proposal already exists');

    await proposalRepository.createProposalCompany({ companyId, dateId, airlineId, boardingId, landingId, type, destiny, name, year });
}

function verifyYear(year: number) {
    const currentYear = dayjs().year();
    if (year < currentYear || year > currentYear) throw wrongSchemaError('The year is not valid');
}

function separateString(name: string){
    const arrSplit = name.split('-');
    return [arrSplit[0].trim(), arrSplit[1].trim()];
}

async function airlineExistsOrNot(airline: string){
    const [nameAirline, initials] = separateString(airline);
    if(initials.length !== 2) throw wrongSchemaError('The initials of the airline are not valid');

    const airlineFound = await airlineRepository.findAirline(nameAirline, initials);
    if (airlineFound) return airlineFound.id;

    await airlineRepository.createAirline(nameAirline, initials);
    const createAirline = await airlineRepository.findAirline(nameAirline, initials);
    if (!createAirline) notFoundError('Airline not found');

    return createAirline.id;
}

async function dateExistsOrNot(start: string, end: string){
    verifyYear(Number(start[2]));
    verifyYear(Number(end[2]));

    const dateFound = await dateRepository.findDateProposal(start, end);
    if(dateFound) return dateFound.id;

    await dateRepository.createDateStartEnd(start, end);
    const createDate = await dateRepository.findDateProposal(start, end);
    if (!createDate) notFoundError('Date not found');

    return createDate.id;
}

async function boardingExistsOrNot(boarding: string){
    const [nameBoarding, initials] = separateString(boarding);
    if(initials.length !== 3) throw wrongSchemaError('The initials of the boarding are not valid');

    const boardingFound = await boardingRepository.findAirportBoarding(nameBoarding, initials);
    if (boardingFound) return boardingFound.id;

    await boardingRepository.createAirportBoarding(nameBoarding, initials);
    const createBoarding = await boardingRepository.findAirportBoarding(nameBoarding, initials);
    if (!createBoarding) notFoundError('Boarding not found');

    return createBoarding.id;
}

async function landingExistsOrNot(landing: string){
    const [nameBoarding, initials] = separateString(landing);
    if(initials.length !== 3) throw wrongSchemaError('The initials of the boarding are not valid');

    const boardingFound = await landingRepository.findAirportLanding(nameBoarding, initials);
    if (boardingFound) return boardingFound.id;

    await landingRepository.createAirportLanding(nameBoarding, initials);
    const createBoarding = await landingRepository.findAirportLanding(nameBoarding, initials);
    if (!createBoarding) notFoundError('Boarding not found');

    return createBoarding.id;
}

const proposalService = {
    createProposal
}

export default proposalService;
