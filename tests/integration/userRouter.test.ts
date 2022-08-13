import { jest } from "@jest/globals";
import supertest from "supertest";

import app from "../../src/app.js";
import prisma from "../../src/config/database.js";
import userFactory from "../factories/userFactory.js";
import { deleteAllTables } from "../factories/scenario.js";

describe('POST /user/sign-up', ()=> {
    it('given a invalid user, should return a status code 422', async ()=> {
        const response = await supertest(app).post('/user/sign-up').send({});

        expect(response.status).toBe(422);
    });

    it('given a invalid email, should return a status code 422', async ()=> {
        const user = userFactory.generateUser();
        const response = await supertest(app).post('/user/sign-up').send({ ...user, email: 'EMAILDETESTE@GMAIL.COM' });

        expect(response.status).toBe(422);
    });

    it('given a valid user, should create a user', async ()=> {
        const user = userFactory.generateUser();
        const response = await supertest(app).post('/user/sign-up').send(user);

        const created = await prisma.user.findUnique({
            where: { email: user.email }
        });

        expect(response.status).toBe(201);
        expect(created).not.toBeNull();
    });

    it('given a user already exists, should return a conflict error', async ()=> {
        const user = {
            ...userFactory.generateUser(),
            email: 'usuárioone@gmail.com'
        }
        const response = await supertest(app).post('/user/sign-up').send(user);

        expect(response.status).toBe(409);
    });
});

afterAll(async ()=> {
    await deleteAllTables();
    await prisma.$disconnect();
});
