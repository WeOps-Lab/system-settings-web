import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 创建 Axios 实例
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'reqApi',
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 封装 GET 请求
export const get = (url: string, config?: AxiosRequestConfig) => {
  return apiClient.get(url, config);
};

// 封装 POST 请求
export const post = (url: string, data?: unknown, config?: AxiosRequestConfig) => {
  return apiClient.post(url, data, config);
};

// 封装 PUT 请求
export const put = (url: string, data?: unknown, config?: AxiosRequestConfig) => {
  return apiClient.put(url, data, config);
};

// 封装 DELETE 请求
export const del = (url: string, config?: AxiosRequestConfig) => {
  return apiClient.delete(url, config);
};
