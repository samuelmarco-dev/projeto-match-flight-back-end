import { jest } from "@jest/globals";
import supertest from "supertest";

import app from "../../src/app.js";
import prisma from "../../src/config/database.js";
import companyFactory from "../factories/companyFactory.js";
import { deleteAllTables, deleteTablesWithoutDependency } from "../factories/scenario.js";

beforeAll(async()=> {
    await deleteAllTables();
    await deleteTablesWithoutDependency();
});

describe('POST /company/sign-up', ()=> {
    it('given a invalid company, should return a status code 422', async()=> {
        const response = await supertest(app).post('/company/sign-up').send({});

        expect(response.status).toBe(422);
    });

    it('given a invalid name, city and state, should return a status code 422', async()=> {
        const comapany = companyFactory.generateCompany();
        const response = await supertest(app).post('/company/sign-up').send({ ...comapany,
            name: 'minha empresa123', city: 'city123', state: 'state123'
        });

        expect(response.status).toBe(422);
    });

    it('given a invalid email and cnpj, should return a status code 422', async()=> {
        const company = companyFactory.generateCompany();
        const response = await supertest(app).post('/company/sign-up').send({ ...company,
            email: 'EMAILDETESTE@GMAIL.COM', cnpj: '1234567890123'
        });

        expect(response.status).toBe(422);
    });

    it('given a valid company, should return a status code 201', async()=> {
        const company = companyFactory.generateCompany();
        const response = await supertest(app).post('/company/sign-up').send(company);

        const created = await prisma.company.findUnique({
            where: { email: company.email }
        });

        expect(response.status).toBe(201);
        expect(created).not.toBeNull();
    });

    it('given a user already exists, should return a status code 409', async()=> {
        const company = companyFactory.generateCompany();
        await companyFactory.createCompanyForConflict({ ...company, email: 'companytest@hotmail.com'});
        const response = await supertest(app).post('/company/sign-up').send({ ...company, email: 'companytest@hotmail.com'});

        expect(response.status).toBe(409);
    });
});

describe('POST /company/sign-in', ()=> {
    it('given a invalid company, should return a status code 422', async()=> {
        const response = await supertest(app).post('/company/sign-in').send({});

        expect(response.status).toBe(422);
    });

    it('given a invalid email, should return a status code 422', async ()=> {
        const company = companyFactory.companyLogin();
        const response = await supertest(app).post('/company/sign-in').send({ ...company, email: 'EMAILDETESTE@GMAIL.COM' });

        expect(response.status).toBe(422);
    });

    it('given a non-existent company, should return a status code 404', async ()=> {
        const company = companyFactory.companyLogin();
        const response = await supertest(app).post('/company/sign-in').send({ ...company, email: 'empresanaoexiste@gmail.com' });

        expect(response.status).toBe(404);
    });

    it('given a company existing, but with incorrect password should return a status code 401', async ()=> {
        const login = {
            email: 'admincompanytest@gmail.com', password: 'umasenhaqualquer'
        }

        const response = await supertest(app).post('/company/sign-in').send(login);
        expect(response.status).toBe(401);
    });

    it('given a company existing, should create a company login', async()=> {
        const company = companyFactory.generateCompany();
        await companyFactory.createCompanyForConflict({ ...company, email: 'companytestlogin@hotmail.com', password: 'senha' });
        const login = {
            email: 'companytestlogin@hotmail.com', password: 'senha'
        }

        const response = await supertest(app).post('/company/sign-in').send(login);
        expect(response.status).toBe(200);
        expect(response.body.token).not.toBeNull();
    });
});

afterAll(async ()=> {
    await prisma.$disconnect();
});
