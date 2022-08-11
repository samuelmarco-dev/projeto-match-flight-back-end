import { jest } from "@jest/globals";
import supertest from "supertest";

import userFactory from "../factories/userFactory.js";
import app from "../../src/app.js";
import prisma from "../../src/config/database.js";

describe('POST /user/sign-up', ()=> {
    it('given a invalid user, should return a status code 422', async ()=> {
        const response = await supertest(app).post('/user/sign-up').send({});

        expect(response.status).toBe(422);
    });

    it('given a invalid email, should return a status code 400', async ()=> {
        const user = userFactory.generateUser();
        const response = await supertest(app).post('/user/sign-up').send({ ...user, email: 'EMAILDETESTE@GMAIL.COM' });

        expect(response.status).toBe(400);
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
        const user = await userFactory.generateUserForConflict();
        const response = await supertest(app).post('/user/sign-up').send(user);

        expect(response.status).toBe(409);
    });
});
