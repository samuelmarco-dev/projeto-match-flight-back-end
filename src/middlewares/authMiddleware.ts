import { NextFunction, Request, Response } from "express";

import { unauthorizedError } from "../utils/errorUtils.js";

export default async function authUserOrCompany(req: Request, res: Response, next: NextFunction){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    if(!token) throw unauthorizedError('Missing token in request authorization');

    //TODO: verify token

    next();
}
