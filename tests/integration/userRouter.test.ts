import { jest } from "@jest/globals";
import supertest from "supertest";

import app from "../../src/app.js";
import prisma from "../../src/config/database.js";
import userFactory from "../factories/userFactory.js";
import { deleteAllTables, deleteTablesWithoutDependency } from "../factories/scenario.js";

beforeAll(async()=> {
    await deleteAllTables();
    await deleteTablesWithoutDependency();
});

describe('POST /user/sign-up', ()=> {
    it('given a invalid user, should return a status code 422', async ()=> {
        const response = await supertest(app).post('/user/sign-up').send({});

        expect(response.status).toBe(422);
    });

    it('given a invalid name, should return a status code 422', async ()=> {
        const user = userFactory.generateUser();
        const response = await supertest(app).post('/user/sign-up').send({ ...user, name: 'meunome1234' });

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
        const user = userFactory.generateUser();
        await userFactory.createUserForConflict({ ...user, email: 'userteste@hotmail.com' });
        const response = await supertest(app).post('/user/sign-up').send({ ...user, email: 'userteste@hotmail.com' });

        expect(response.status).toBe(409);
    });
});

describe('POST /user/sign-in', ()=> {
    it('given a invalid user, should return a status code 422', async()=> {
        const response = await supertest(app).post('/user/sign-in').send({});

        expect(response.status).toBe(422);
    });

    it('given a invalid email, should return a status code 422', async ()=> {
        const user = userFactory.userLogin();
        const response = await supertest(app).post('/user/sign-up').send({ ...user, email: 'EMAILDETESTE@GMAIL.COM' });

        expect(response.status).toBe(422);
    });

    it('given a non-existent user, should return a status code 404', async ()=> {
        const user = userFactory.userLogin();
        const response = await supertest(app).post('/user/sign-in').send({ ...user, email: 'usuarionaoexiste@gmail.com' });

        expect(response.status).toBe(404);
    });

    it('given a user existing, but with incorrect password should return a status code 401', async ()=> {
        const login = {
            email: 'adminusertest@gmail.com', password: 'umasenhaqualquer'
        }

        const response = await supertest(app).post('/user/sign-in').send(login);
        expect(response.status).toBe(401);
    });

    it('given a user existing, should create a user login', async()=> {
        const user = userFactory.generateUser();
        await userFactory.createUserForConflict({ ...user, email: 'usertestlogin@hotmail.com', password: 'senha' });
        const login = {
            email: 'usertestlogin@hotmail.com', password: 'senha'
        }

        const response = await supertest(app).post('/user/sign-in').send(login);
        expect(response.status).toBe(200);
        expect(response.body.token).not.toBeNull();
    });
});

afterAll(async ()=> {
    await prisma.$disconnect();
});
