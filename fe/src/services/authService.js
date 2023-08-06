import { deleteMethod, getMethod, postMethod, putMethod } from "./apiService";
import { timeDelay } from "./common";

export const AUTH_SERVICE = {
    async login(data) {
        try {
            const response = await postMethod('auth/login', data);
            await timeDelay(2000);
            return response;
        } catch (error) {
            return error;
        }
    },

    async register(data) {
        try {
            const response = await postMethod('auth/register', data);
            return response;
        } catch (error) {
            return error;
        }
    },

    async getProfile() {
        try {
            const response = await getMethod('auth/profile');
            await timeDelay(2000);
            return response;
        } catch (error) {
            return error;
        }
    },

    async updateProfile(data) {
        try {
            const response = await putMethod('auth/profile', data);
            await timeDelay(2000);
            return response;
        } catch (error) {
            return error;
        }
    },
}
