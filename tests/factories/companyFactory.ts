import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import app from '../../src/app.js';

import prisma from '../../src/config/database.js';
import { CompanyData, Login } from '../../src/interfaces/index.js';
import { addressExistsOrNot, cnpjExistsOrNot } from '../../src/services/companyService.js';
import { imageExistsOrNot } from '../../src/services/userService.js';
import { encrytedPassword } from '../../src/utils/encryptedPassUtils.js';

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function generateCompany(): CompanyData {
    const password = faker.internet.password();

    return {
        name: `Agency ${faker.name.lastName()}`,
        url: faker.image.imageUrl(),
        city: faker.address.cityName(),
        state: faker.address.state(),
        cnpj: `${getRandomInt(10, 99)}.560.0${getRandomInt(10, 99)}/0001-${getRandomInt(10, 99)}`,
        type: 'TravelAgency',
        email: 'admincompanytest@gmail.com',
        password: password,
        confirmPassword: password
    }
}

async function createCompanyForConflict(company: CompanyData){
    const { name, url, city, state, cnpj, type, email, password } = company;
    const [imageId, addressId, cnpjId] = await Promise.all([
        imageExistsOrNot(url), addressExistsOrNot(city, state), cnpjExistsOrNot(cnpj)
    ]);

    await prisma.company.create({
        data: {
            name,
            imageId,
            addressId,
            cnpjId,
            email,
            type,
            password: await encrytedPassword(password)
        }
    });
}

function companyLogin(): Login {
    return {
        email: faker.internet.email(),
        password: faker.internet.password()
    }
}

async function companyLoginFlow(){
    const email = faker.internet.email().toLowerCase();
    const company = generateCompany();
    await createCompanyForConflict({ ...company, email, password: '123456789' });

    const response = await supertest(app).post('/company/sign-in').send({ email, password: '123456789' });
    expect(response.status).toBe(200);
    expect(response.body.token).not.toBeNull();

    return { response, email };
}

const companyFactory = {
    generateCompany,
    createCompanyForConflict,
    companyLogin,
    companyLoginFlow
}

export default companyFactory;
