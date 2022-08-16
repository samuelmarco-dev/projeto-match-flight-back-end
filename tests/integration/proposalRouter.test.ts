
import { jest } from "@jest/globals";
import supertest from "supertest";

import app from "../../src/app.js";
import prisma from "../../src/config/database.js";
import companyFactory, { getRandomInt } from "../factories/companyFactory.js";
import proposalFactory from "../factories/proposalFactory.js";
import { deleteAllTables, deleteTablesWithoutDependency } from "../factories/scenario.js";
import tokenFactory from "../factories/tokenFactory.js";
import userFactory from "../factories/userFactory.js";

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
        const invalidToken = tokenFactory.generateInvalidToken();

        const companyCreate = await prisma.company.findUnique({
            where: { email }
        });
        expect(companyCreate).not.toBeNull();

        const response = await supertest(app).post('/proposal').set('Authorization', `Bearer ${invalidToken}`)
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

describe('GET /proposals/company/:id', ()=> {
    it('given a company exists and a valid token, should return status code 200', async()=> {
        const { response: login, email } = await companyFactory.companyLoginFlow();

        const companyCreate = await prisma.company.findUnique({
            where: { email }
        });
        expect(companyCreate).not.toBeNull();

        const response = await supertest(app).get(`/proposals/company/${companyCreate.id}`)
        .set('Authorization', `Bearer ${login.body.token}`);
        expect(response.status).toBe(200);
    });

    it('given a company nonexistent and a valid token, should return status code 401', async()=> {
        const { response: login, email } = await companyFactory.companyLoginFlow();

        const companyCreate = await prisma.company.findUnique({
            where: { email }
        });
        expect(companyCreate).not.toBeNull();

        const response = await supertest(app).get(`/proposals/company/${companyCreate.id + getRandomInt(10, 20)}`)
        .set('Authorization', `Bearer ${login.body.token}`);
        expect(response.status).toBe(401);
    });

    it('given a company exists and a invalid token, should return status code 404', async()=> {
        const { email } = await companyFactory.companyLoginFlow();
        const invalidToken = tokenFactory.generateInvalidToken();

        const companyCreate = await prisma.company.findUnique({
            where: { email }
        });
        expect(companyCreate).not.toBeNull();

        const response = await supertest(app).get(`/proposals/company/${companyCreate.id}`)
        .set('Authorization', `Bearer ${invalidToken}`);
        expect(response.status).toBe(404);
    });

    it('given a company exists, but with no token should return status code 401', async()=> {
        const { email } = await companyFactory.companyLoginFlow();

        const companyCreate = await prisma.company.findUnique({
            where: { email }
        });
        expect(companyCreate).not.toBeNull();

        const response = await supertest(app).get(`/proposals/company/${companyCreate.id}`);
        expect(response.status).toBe(401);
    });

    it('given a company exists and token with type: userId, should return status code 401', async()=> {
        const { email } = await companyFactory.companyLoginFlow();
        const { response: login } = await userFactory.userLoginFlow();

        const companyCreate = await prisma.company.findUnique({
            where: { email }
        });
        expect(companyCreate).not.toBeNull();

        const response = await supertest(app).get(`/proposals/company/${companyCreate.id}`)
        .set('Authorization', `Bearer ${login.body.token}`);
        expect(response.status).toBe(401);
    });
});

describe('GET /proposals/user', ()=> {
    it('given a user exists and a valid token, should return status code 200', async()=> {
        const { response: login, email } = await userFactory.userLoginFlow();

        const userCreate = await prisma.user.findUnique({
            where: { email }
        });
        expect(userCreate).not.toBeNull();

        const response = await supertest(app).get(`/proposals/user`).set('Authorization', `Bearer ${login.body.token}`);
        expect(response.status).toBe(200);
    });

    it('given a user exists, but with no token should return status code 401', async()=> {
        const { email } = await userFactory.userLoginFlow();

        const userCreate = await prisma.user.findUnique({
            where: { email }
        });
        expect(userCreate).not.toBeNull();

        const response = await supertest(app).get(`/proposals/user`);
        expect(response.status).toBe(401);
    });

    it('given a user exists and a invalid token, should return status code 404', async()=> {
        const { email } = await userFactory.userLoginFlow();
        const invalidToken = tokenFactory.generateInvalidToken();

        const userCreate = await prisma.user.findUnique({
            where: { email }
        });
        expect(userCreate).not.toBeNull();

        const response = await supertest(app).get(`/proposals/user`).set('Authorization', `Bearer ${invalidToken}`);
        expect(response.status).toBe(404);
    });

    it('given a user exists and token with type: companyId, should return status code 401', async()=> {
        const { email } = await userFactory.userLoginFlow();
        const { response: login } = await companyFactory.companyLoginFlow();

        const userCreate = await prisma.user.findUnique({
            where: { email }
        });
        expect(userCreate).not.toBeNull();

        const response = await supertest(app).get(`/proposals/user`).set('Authorization', `Bearer ${login.body.token}`);
        expect(response.status).toBe(401);
    });
});

afterAll(async()=> {
    await prisma.$disconnect();
});
