import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export interface AppAxiosRequestConfig extends AxiosRequestConfig {
    // Place for fields
}
export interface AppAxiosError extends AxiosError {

}

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT
})

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
    return config
})

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

const axiosRequest = {
    async get<T>(url: string, config?: AppAxiosRequestConfig): Promise<T> {
        return axiosInstance.get<T>(url, config).then((response) => response.data);
    },

    async post<T>(url: string, data?: any, config?: AppAxiosRequestConfig): Promise<T> {
        return axiosInstance.post<T>(url, data, config).then((response) => response.data).catch();
    },

    async put<T>(url: string, data?: any, config?: AppAxiosRequestConfig): Promise<T> {
        return axiosInstance.put<T>(url, data, config).then((response) => response.data);
    },

    async delete<T>(url: string, config?: AppAxiosRequestConfig): Promise<T> {
        return axiosInstance.delete<T>(url, config).then((response) => response.data);
    },
};

export default axiosRequest;