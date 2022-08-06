import { NextFunction, Request, Response } from "express";

import { unauthorizedError } from "../utils/errorUtils.js";
import { verifyJsonWebToken } from "../utils/tokenJwtUtils.js";

export default async function authUserOrCompany(req: Request, res: Response, next: NextFunction){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    if(!token) throw unauthorizedError('Missing token in request authorization');

    const { type, session } = await verifyJsonWebToken(token);
    res.locals.session = session;
    res.locals.type = type;

    next();
}
