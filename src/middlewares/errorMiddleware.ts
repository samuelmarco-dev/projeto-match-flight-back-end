import { NextFunction, Request, Response } from "express";

import { AppError } from "../interfaces/index.js";
import { errorTypeToStatusCode, isAppError } from "../utils/errorUtils.js";

export default function handleError(err: Error | AppError, req: Request, res: Response, next: NextFunction){
    console.log(err);

    if(isAppError(err)){
        return res.status(errorTypeToStatusCode(err.type)).send(err.message);
    }
    return res.sendStatus(500);
}
