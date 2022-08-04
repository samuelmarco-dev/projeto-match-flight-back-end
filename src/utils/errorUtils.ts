import { AppErrorTypes, AppError } from "../interfaces/index.js";

export function isAppError(error: object): error is AppError {
    return (error as AppError).type !== undefined;
}

export function errorTypeToStatusCode(type: AppErrorTypes) {
    if (type === "conflict") return 409;
    if (type === "not_found") return 404;
    if (type === "unauthorized") return 401;
    return 400;
}

export function conflictError(message: string): AppError {
    return { type: "conflict", message };
}

export function notFoundError(message: string): AppError {
    return { type: "not_found", message };
}

export function unauthorizedError(message: string): AppError {
    return { type: "unauthorized", message };
}

export function badRequestError(message: string): AppError {
    return { type: "bad_request", message };
}
