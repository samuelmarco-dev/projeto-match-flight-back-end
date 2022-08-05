import { User } from "@prisma/client";

export type AppErrorTypes = "conflict" | "not_found" | "unauthorized" | "bad_request" | "wrong_schema";

export type UserData = Omit<User, "id" | "updatedAt" | "createdAt" | "imageId"> & {
    url: string;
    confirmPassword: string;
};

export type UserBody = Omit<User, "id" | "updatedAt" | "createdAt">;

export interface AppError {
    type: AppErrorTypes;
    message: string;
};

export interface Login {
    email: string;
    password: string;
}
