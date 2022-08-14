import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import * as sessionRepository from '../repositories/sessionsRepository.js';
import { TokenPayload } from '../interfaces/index.js';
import { notFoundError, unauthorizedError } from './errorUtils.js';

const secret = process.env.JWT_SECRET;

export async function generateJsonWebToken(id: number, auth: string){
    const validity = { expiresIn: 3600*3 };
    const token = jwt.sign(
        { id, type: auth }, secret, validity
    );

    return token;
}

export async function verifyJsonWebToken(token: string){
    try {
        const verification = jwt.verify(token, secret);
        const { id, type } = verification as TokenPayload;

        if (!type || !id || !verification) {
            await invalidateToken(token);
            throw unauthorizedError('Invalid token');
        }

        return {
            type: type,
            session: await authTypeUserOrCompany(type, token)
        }
    } catch (error) {
        await invalidateToken(token);
        if(error.name === 'TokenExpiredError') throw unauthorizedError('Token expired');
        throw unauthorizedError('Invalid token');
    }
}

async function authTypeUserOrCompany(type: string, token: string){
    if (type === 'userId'){
        const sessionUser = await sessionRepository.findSessionUser(token);
        if (!sessionUser || !sessionUser.isActive) throw notFoundError('Session user not found');
        return sessionUser;
    }
    if (type === 'companyId'){
        const companySession = await sessionRepository.findSessionCompany(token);
        if (!companySession || !companySession.isActive) throw notFoundError('Session company not found');
        return companySession;
    }

    throw unauthorizedError('Invalid auth type on token');
}

async function invalidateToken(token: string){
    const tokenUser = await sessionRepository.findSessionUser(token);
    if (tokenUser) {
        await sessionRepository.invalidateSessionUser(token);
        return;
    }

    const tokenCompany = await sessionRepository.findSessionCompany(token);
    if (tokenCompany) {
        await sessionRepository.invalidateSessionCompany(token);
        return;
    }

    throw notFoundError('Token not found');
}
