import { Request } from 'express';

export type TUserInfo = {
 _id: string;
}
export interface IInfoRequest extends Request {
    user?: TUserInfo
}

export interface IAppError extends Error {
    statusCode?: number,
}
