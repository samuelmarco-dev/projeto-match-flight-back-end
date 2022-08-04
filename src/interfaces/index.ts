import { User } from "@prisma/client";

export type AppErrorTypes = "conflict" | "not_found" | "unauthorized" | "bad_request";

export interface AppError {
    type: AppErrorTypes;
    message: string;
};

export type UserData = Omit<User, "id" | "updatedAt" | "createdAt" | "imageId"> & {
    url: string;
    confirmPassword: string;
};

export type UserBody = Omit<User, "id" | "updatedAt" | "createdAt">;
export type UserLogin = Omit<User, "id" | "updatedAt" | "createdAt" | "imageId" | "name">;
