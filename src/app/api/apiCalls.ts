import apiClient from './apiClient';

export const getIpInfos = (ipAddress: string) => {
  return apiClient.get(`https://ipwho.is/${ipAddress}`, {});
};

export const getUserIp = () => {
  return apiClient.get(`https://api.ipify.org?format=json`, {});
};
