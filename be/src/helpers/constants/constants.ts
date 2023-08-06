import { IHttpStatus } from "../interface/httpStatus.interface";
import { IUser } from "../interface/user.interface";

export const HTTP_STATUS: IHttpStatus = {
	error: 'error',
	success: 'success',
	fail: 'fail',
}

export enum USER_TYPE {
	ADMIN = 'ADMIN',
	USER = 'USER',
	DEFAULT='DEFAULT'
}

export enum USER_STATUS {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
	PENDING = 'PENDING'
}

export const USER_CONST: any = {
	USER_STATUS_ACTIVE: 1,
	USER_STATUS_LOCK: -1,
	USER_ADM: 1,
	USER_PUB: 2
}

export const USER_STATUS_ACTIVE: number = 1;

export const ROLES = {
	admin: 1,
	supplier: 2,
	department: 3
}

export const regexGmail = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g;
export const regexEmail = /^[^\s@!#$%&'*+/=?^_`{|}~-]+@[^\s@!#$%&'*+/=?^_`{|}~-]+\.[^\s@!#$%&'*+/=?^_`{|}~-]+$/;
export const regexPass = /^[a-zA-Z0-9]{6,20}$/g;
export const regexUserName = /^[a-zA-Z0-9]{6,20}$/g;
export const regexPhone = /[0-9]{10}/g;