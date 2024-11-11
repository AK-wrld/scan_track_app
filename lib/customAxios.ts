import {AxiosRequestConfig} from 'axios';
import api from '../services/url';
import {cookieNames} from '../Globals/constants';
import {getCookie} from '../utils/CookieManager';
export const useCustomAxios = () => {
  const authToken = getCookie(cookieNames.jwtToken);

  const defaultConfig = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const getConfig = (customConfig: AxiosRequestConfig | undefined) => {
    return customConfig ? {...defaultConfig, ...customConfig} : defaultConfig;
  };

  const axiosGet = async (url: string, config?: AxiosRequestConfig) =>
    api.get(url, {...getConfig(config)});

  const axiosPost = async (
    url: string,
    postBody: {[key: string]: any},
    config?: AxiosRequestConfig,
  ) => api.post(url, postBody, {...getConfig(config)});

  const axiosPut = async (
    url: string,
    putBody: {[key: string]: any},
    config?: AxiosRequestConfig,
  ) => api.put(url, putBody, {...getConfig(config)});

  const axiosPatch = async (
    url: string,
    patchBody: {[key: string]: any},
    config?: AxiosRequestConfig,
  ) => api.patch(url, patchBody, {...getConfig(config)});

  const axiosDelete = async (url: string, deleteBody: {[key: string]: any}) =>
    api.put(url, deleteBody);

  return {axiosGet, axiosPost, axiosPut, axiosPatch, axiosDelete};
};
