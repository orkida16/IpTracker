import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {Alert} from 'react-native';

const BASE_URL = '';

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

const eventHandlers = new Map();
function isNetworkError(err: any) {
  return !!err.isAxiosError && !err.response;
}

axiosClient.interceptors.request.use(async req => {
  // If integrate users , here we check for token and add authorization header
  return req;
});
const responseErrorHandler = async (error: any) => {
  let errors = ['Something went wrong, please try again!'];
  let message;
  if (error.response) {
    if (error.response.data.payload.message) {
      message = error.response.data.payload.message;
    }
    if (error.response.data.payload.errors) {
      errors = error.response.data.payload.errors;
    }
    if (error.response.data.payload.error) {
      errors = [error.response.data.payload.error];
    }
  } else if (error.request) {
    console.log('err.req', error.request);
  } else {
    console.log('Error', error.message);
  }

  return Promise.reject({
    status: error.response.status,
    errors: errors,
    message: message,
  });
};

const responseSuccessHandler = (response: AxiosResponse) => {
  return response;
};

axiosClient.interceptors.response.use(
  response => responseSuccessHandler(response),
  error => responseErrorHandler(error),
);

const serverError =
  'Server returned an error. Please, contact the support team.';
const connectionError =
  'Connection error. Please, check your Internet connection.';

const throwApiError = ({data = {}}) => {
  return data;
};

const httpRequest = (method: string) => async (url: string, data: any) => {
  const options: AxiosRequestConfig = {
    method,
    url,
  };

  if (data) {
    if (data.blob) {
      options.responseType = 'blob';
    }
    if (method === 'get') {
      options.params = data.queryParams;
    } else {
      options.data = data;
    }
  }
  const axiosResponse = await axiosClient(options);
  if (isNetworkError(axiosResponse)) {
    Alert.alert('', connectionError);
    throwApiError({
      data: {errors: []},
    });
    return null;
  }

  const response: AxiosResponse | any = {};
  response.data = axiosResponse.data || {};
  response.status = axiosResponse.status || 500;
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }

  if (response.status === 400) {
    throwApiError(response);
  }

  if (response.status === 500) {
    Alert.alert('', serverError);
  }
  if (response.status === 401) {
  }

  if (!axiosResponse.data.errors) {
    Alert.alert('', axiosResponse.data.message ?? serverError);
  }
  response.data.errors = axiosResponse.data.errors || [];
  throwApiError(response);
  return null;
};

export const getRequest = httpRequest('get');
export const postRequest = httpRequest('post');
export const putRequest = httpRequest('put');
export const patchRequest = httpRequest('patch');
export const deleteRequest = httpRequest('delete');

const apiClient = {
  get: getRequest,
  post: postRequest,
  put: putRequest,
  delete: deleteRequest,
  patch: patchRequest,
  on: (event: any, handler: any) => {
    if (eventHandlers.has(event)) {
      eventHandlers.get(event).add(handler);
    } else {
      eventHandlers.set(event, new Set([handler]));
    }

    return () => eventHandlers.get(event).remove(handler);
  },
};

export default apiClient;
