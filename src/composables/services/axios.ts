import axios, {AxiosError, AxiosHeaders, type AxiosInstance} from 'axios';
import {useAuthStore} from "@/stores/auth";
import {useUiStore} from "@/stores/ui";
import {useI18n} from "vue-i18n";
import i18n from "@/plugins/i18n";

const baseUrl = 'http://localhost:5047/api';

//create axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
});

//request interceptors
axiosInstance.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();

        //prepare headers if necessary
        if (config.headers === undefined) {
            config.headers = new AxiosHeaders();
        }

        if (authStore.ojpToken !== null && !config.headers.has('Authorization')) {
            config.headers.set('Authorization', `Bearer ${authStore.ojpToken}`);
        }
        console.log(config);
        return config;
    },
    (error) => Promise.reject(error),
);

//response interceptors
axiosInstance.interceptors.response.use(
    (response) => {
        const uiStore = useUiStore();
        uiStore.axiosError = null;
        return response;
    },
    (error: AxiosError<any, any>): any => {
        const uiStore = useUiStore();

        const serverError: OjpProxyErrorResponse = error.response?.data;
        const customError = {
            canonicalErrorMsg: i18n.global.t(serverError.Canonical),
            errorMessage: error.message,
            errorCode: error.code,
            httpStatus: error.response?.status,
            httpStatusText: error.response?.statusText,
            response: serverError.Exception
        } as AxiosCustomError;

        console.log(customError);
        uiStore.axiosError = customError;
    },
);

export function useAxios(): AxiosInstance {
    return axiosInstance;
}

export interface AxiosCustomError {
    canonicalErrorMsg: string;
    errorMessage: string;
    errorCode: string;

    httpStatus: number;
    httpStatusText: string;
    response: string | null;
}

export interface OjpProxyErrorResponse {
    Canonical: string;
    Exception: string | null;
}