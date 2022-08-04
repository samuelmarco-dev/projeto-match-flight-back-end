export type AppErrorTypes = "conflict" | "not_found" | "unauthorized"

export interface AppError {
    type: AppErrorTypes;
    message: string;
}
