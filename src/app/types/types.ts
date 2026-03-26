export interface IClient {
    _id: string;
    id?: string;
    username: string;
    password?: string;
    phone: string;
    category: string;
    sitename: string;
    role?: string;
    status?: "active" | "inactive";
    createdAt?: string;
    updatedAt?: string;
}


export interface IResponse<T = unknown> {
    success: boolean;
    statusCode?: number;
    message: string;
    data: T;
    userId?: string;
    accessToken?: string;
    refreshToken?: string;
    token?: string;
    meta?: {
        page: number;
        limit: number;
        total: number;
    };
}

export enum TagTypes {
    clients = "Clients",
    Auth = "Auth",
}

export const typeTagList = [TagTypes.clients, TagTypes.Auth];