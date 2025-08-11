import { ErrorResponse } from '@DatatTypes/api/error-response';
import axios, { type AxiosResponse, type AxiosInstance, type AxiosRequestConfig, type AxiosError } from 'axios';

const createAxios = (requestConfig: AxiosRequestConfig): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: requestConfig.baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    async config => {
      return config;
    },
    error => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.data.status && response.data.status !== 200) {
        // MEMO: 에러 분기 처리 요구사항 없으므로 생략.
        // if (response.data.status === 401) {}

        // MEMO: reissue 처리 요구사항 없으므로 생략.
        // if (response.data.status === 498) {}

        const errorResponse = response.data as ErrorResponse;
        return Promise.reject({
          url: response.config?.url,
          status: errorResponse.status,
          error: errorResponse.error,
          message: errorResponse.message,
        });
      }

      return response;
    },
    (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        // MEMO: 에러 분기 처리 요구사항 없으므로 생략.
        // if (error.response.status === 401) {}

        // MEMO: reissue 처리 요구사항 없으므로 생략.
        // if (error.response.status === 498) {}

        console.error('API 응답 에러:', {
          url: error.config?.url,
          status: error.response.status,
          error: error.response.data.error,
          message: error.message,
        });
      } else if (error.request) {
        console.error('API 응답 에러:', {
          url: error.config?.url,
          message: '서버로부터 응답이 없습니다. 네트워크 연결을 확인해주세요.',
        });
      } else {
        console.error('API 응답 에러:', {
          url: error.config?.url,
          message: '알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
        });
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export const axiosServerAPI = () => {
  return createAxios({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  });
};

export const axiosClientAPI = () => {
  return createAxios({
    baseURL: '/api',
  });
};
