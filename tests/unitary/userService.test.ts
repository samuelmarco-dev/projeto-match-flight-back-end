import { jest } from "@jest/globals";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

import userService from "../../src/services/userService.js";
import userFactory from "../factories/userFactory.js";
import imageFactory from "../factories/imageFactory.js";
import userRepository from "../../src/repositories/userRepository.js";
import { deleteAllTables } from "../factories/scenario.js";
import imageRepository from "../../src/repositories/imageRepository.js";
import sessionRepository from "../../src/repositories/sessionsRepository.js";

beforeEach(async ()=> {
    await deleteAllTables();
    jest.clearAllMocks();
    jest.resetAllMocks();
});

describe('userService test suite', ()=> {
    // it('should create a user', async ()=> {
    //     const imageExists = imageFactory.imageExistsInTestUnitary();

    //     jest.spyOn(userRepository, 'findUserByEmail').mockImplementationOnce((): any => {});
    //     jest.spyOn(bcrypt, 'genSalt').mockImplementationOnce(()=> 10);
    //     jest.spyOn(bcrypt, 'hash').mockImplementationOnce(()=> 'encryptedPassword');
    //     jest.spyOn(imageRepository, 'findImageByUrl').mockImplementationOnce((): any => {});
    //     jest.spyOn(imageRepository, 'createImage').mockResolvedValueOnce(null);
    //     jest.spyOn(imageRepository, 'findImageByUrl').mockImplementationOnce((): any => imageExists);
    //     jest.spyOn(userRepository, 'createUser').mockResolvedValueOnce(null);

    //     await userService.createUser(userFactory.generateUser());
    //     expect(userRepository.findUserByEmail).toBeCalled();
    //     expect(bcrypt.genSalt).toBeCalled();
    //     expect(bcrypt.hash).toBeCalled();
    //     expect(imageRepository.findImageByUrl).toBeCalledTimes(2);
    //     expect(imageRepository.createImage).toBeCalled();
    //     expect(userRepository.createUser).toBeCalled();
    // });

    // it('should not a create user, if user already exists', async ()=> {
    //     const userExists = userFactory.userExistsInTestUnitary();
    //     jest.spyOn(userRepository, 'findUserByEmail').mockImplementationOnce((): any => userExists);


    //     expect(async()=> {
    //         await userService.createUser(userFactory.generateUser())
    //     }).rejects.toThrow('User already exists');
    //     expect(userRepository.findUserByEmail).toBeCalled();
    //     expect(bcrypt.genSalt).not.toBeCalled();
    //     expect(bcrypt.hash).not.toBeCalled();
    //     expect(imageRepository.findImageByUrl).not.toBeCalled();
    //     expect(imageRepository.createImage).not.toBeCalled();
    //     expect(userRepository.createUser).not.toBeCalled();
    // });

    // it('given an existing user, it should create the login', async()=> {
    //     const userExists = userFactory.userExistsInTestUnitary();

    //     jest.spyOn(userRepository, 'findUserByEmail').mockImplementationOnce((): any => userExists);
    //     jest.spyOn(bcrypt, 'compare').mockImplementationOnce(()=> true);
    //     jest.spyOn(jwt, 'sign').mockImplementationOnce(()=> 'token');
    //     jest.spyOn(sessionRepository, 'createSessionUser').mockResolvedValueOnce(null);

    //     await userService.loginUser(userFactory.userLogin());
    //     expect(userRepository.findUserByEmail).toBeCalled();
    //     expect(bcrypt.compare).toBeCalled();
    //     expect(jwt.sign).toBeCalled();
    //     expect(sessionRepository.createSessionUser).toBeCalled();
    // });

    // it('given a non-existent user, it should not create the login', async()=> {
    //     jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValueOnce(null);

    //     expect(async()=> {
    //         await userService.loginUser(userFactory.userLogin())
    //     }).rejects.toThrow('User not found');
    //     expect(userRepository.findUserByEmail).toBeCalled();
    //     expect(bcrypt.compare).not.toBeCalled();
    //     expect(jwt.sign).not.toBeCalled();
    //     expect(sessionRepository.createSessionUser).not.toBeCalled();
    // });

    // it('given a user exists but with incorrect password, should not create login', async()=> {
    //     const userExists = userFactory.userExistsInTestUnitary();

    //     jest.spyOn(userRepository, 'findUserByEmail').mockImplementationOnce((): any => userExists);
    //     jest.spyOn(bcrypt, 'compare').mockImplementationOnce(()=> false);

    //     expect(async()=> {
    //         await userService.loginUser(userFactory.userLogin())
    //     }).rejects.toThrow('Password does not match');
    //     expect(userRepository.findUserByEmail).toBeCalled();
    //     expect(bcrypt.compare).toBeCalled();
    //     expect(jwt.sign).not.toBeCalled();
    //     expect(sessionRepository.createSessionUser).not.toBeCalled();
    // });
});
