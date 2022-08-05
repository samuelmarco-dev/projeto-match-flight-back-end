import { Request, Response } from "express";

import userService from "../services/userService.js";
import verifyReqBody from "../utils/errorReqBody.js";
import { Login, UserData } from '../interfaces/index.js';

export async function createUser(req: Request, res: Response){
    const { url, name, email, password, confirmPassword }: UserData = req.body;
    verifyReqBody(req.body);

    await userService.createUser({ url, name, email, password, confirmPassword });
    res.sendStatus(201);
}

export async function loginUser(req: Request, res: Response){
    const { email, password }: Login = req.body;
    verifyReqBody(req.body);

    const token = await userService.loginUser({ email, password });
    res.status(200).send(token);
}
