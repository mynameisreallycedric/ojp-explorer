import axios, {AxiosError, AxiosHeaders, type AxiosInstance} from 'axios';

const baseUrl = 'http://localhost:5047/api';

//create axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
});

//request interceptors
axiosInstance.interceptors.request.use(
    (config) => {

        //prepare headers if necessary
        if (config.headers === undefined) {
            config.headers = new AxiosHeaders();
        }

        console.log(config)
        return config;
    },
    (error) => Promise.reject(error),
);

//response interceptors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<any, any>): any => console.log(error),
);

export function useAxios(): AxiosInstance {
    return axiosInstance;
}