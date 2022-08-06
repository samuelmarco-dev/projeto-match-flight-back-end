import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import * as sessionRepository from '../repositories/sessionsRepository.js';
import { TokenPayload } from '../interfaces/index.js';
import { notFoundError, unauthorizedError } from './errorUtils.js';

const secret = process.env.JWT_SECRET;

export async function generateJsonWebToken(id: number, auth: string){
    const validity = { expiresIn: 21600 };
    const token = jwt.sign(
        { id, type: auth }, secret, validity
    );

    return token;
}

export async function verifyJsonWebToken(token: string){
    try {
        const verification = jwt.verify(token, secret);
        const { id, type } = verification as TokenPayload;
        if (!type || !id || !verification) throw unauthorizedError('Invalid token');

        return {
            type: type,
            session: await authTypeUserOrCompany(type, token)
        }
    } catch (error) {
        if(error.name === 'TokenExpiredError') throw unauthorizedError('Token expired');
        throw unauthorizedError('Invalid token');
    }
}

async function authTypeUserOrCompany(type: string, token: string){
    if (type === 'userId'){
        const sessionUser = await sessionRepository.findSessionUser(token);
        if (!sessionUser) throw notFoundError('Session user not found');
        return sessionUser;
    }
    if (type === 'companyId'){
        const companySession = await sessionRepository.findSessionCompany(token);
        if (!companySession) throw notFoundError('Session company not found');
        return companySession;
    }

    throw unauthorizedError('Invalid auth type on token');
}
