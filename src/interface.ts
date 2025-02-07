import { Request } from 'express';

export interface IInfoRequest extends Request {
    user?: { _id: string }
}

export interface IAppError extends Error {
    statusCode?: number,
}
