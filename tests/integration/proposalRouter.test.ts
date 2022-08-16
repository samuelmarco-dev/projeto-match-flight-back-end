
import { jest } from "@jest/globals";
import supertest from "supertest";

import app from "../../src/app.js";
import prisma from "../../src/config/database.js";
import companyFactory, { getRandomInt } from "../factories/companyFactory.js";
import proposalFactory from "../factories/proposalFactory.js";
import { deleteAllTables, deleteTablesWithoutDependency } from "../factories/scenario.js";
import tokenFactory from "../factories/tokenFactory.js";

beforeAll(async()=> {
    await deleteAllTables();
    await deleteTablesWithoutDependency();
});

describe('POST /proposal', ()=> {
    it('given a company exists and a invalid proposal, should return status code 422', async()=> {
        const { response: login, email } = await companyFactory.companyLoginFlow();

        const companyCreate = await prisma.company.findUnique({
            where: { email }
        });
        expect(companyCreate).not.toBeNull();

        const response = await supertest(app).post('/proposal').set('Authorization', `Bearer ${login.body.token}`).send({});
        expect(response.status).toBe(422);
    });

    it('given a company nonexistent and a valid proposal, should return status code 401', async()=> {
        const { response: login, email } = await companyFactory.companyLoginFlow();
        const proposal = proposalFactory.generateProposal();

        const companyCreate = await prisma.company.findUnique({
            where: { email }
        });
        expect(companyCreate).not.toBeNull();

        const response = await supertest(app).post('/proposal').set('Authorization', `Bearer ${login.body.token}`)
        .send({ ...proposal, companyId: (companyCreate.id + getRandomInt(10, 20)) });
        expect(response.status).toBe(401);
    });

    it('given a company exists and a valid proposal, should return status code 201', async()=> {
        const { response: login, email } = await companyFactory.companyLoginFlow();
        const proposal = proposalFactory.generateProposal();

        const companyCreate = await prisma.company.findUnique({
            where: { email }
        });
        expect(companyCreate).not.toBeNull();

        const response = await supertest(app).post('/proposal').set('Authorization', `Bearer ${login.body.token}`)
        .send({ ...proposal, companyId: companyCreate.id });
        expect(response.status).toBe(201);
    });

    it('given a proposal with relation unique exists, should return status code 409', async()=> {
        const { response: login, email } = await companyFactory.companyLoginFlow();
        const proposal = proposalFactory.generateProposal();

        const companyCreate = await prisma.company.findUnique({
            where: { email }
        });
        expect(companyCreate).not.toBeNull();

        const response = await supertest(app).post('/proposal').set('Authorization', `Bearer ${login.body.token}`)
        .send({ ...proposal, companyId: companyCreate.id });
        expect(response.status).toBe(201);

        const responseConflict = await supertest(app).post('/proposal').set('Authorization', `Bearer ${login.body.token}`)
        .send({ ...proposal, companyId: companyCreate.id });
        expect(responseConflict.status).toBe(409);
    });

    it('given a company exists and a valid proposal, but with invalid token should return status code 404', async()=> {
        const { email } = await companyFactory.companyLoginFlow();
        const proposal = proposalFactory.generateProposal();
        const inavalidToken = tokenFactory.generateInvalidToken();

        const companyCreate = await prisma.company.findUnique({
            where: { email }
        });
        expect(companyCreate).not.toBeNull();

        const response = await supertest(app).post('/proposal').set('Authorization', `Bearer ${inavalidToken}`)
        .send({ ...proposal, companyId: companyCreate.id });
        expect(response.status).toBe(404);
    });

    it('given a company exists and a valid proposal, but with no token should return status code 401', async()=> {
        const { email } = await companyFactory.companyLoginFlow();
        const proposal = proposalFactory.generateProposal();

        const companyCreate = await prisma.company.findUnique({
            where: { email }
        });
        expect(companyCreate).not.toBeNull();

        const response = await supertest(app).post('/proposal').send({ ...proposal, companyId: companyCreate.id });
        expect(response.status).toBe(401);
    });
});

// describe('GET /proposals/company/:id', ()=> {
//     //TODO: para buscar as propostas que foram criar pela empresa :id, a empresa deve estar autenticada
// });

// describe('GET /proposals/user', ()=> {
//     //TODO: para buscar todas as propostas oferecidas para o usuário, o usuário deve estar autenticado
// });

afterAll(async()=> {
    await prisma.$disconnect();
});
