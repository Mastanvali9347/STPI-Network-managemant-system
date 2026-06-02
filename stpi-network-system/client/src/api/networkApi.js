import axiosClient from './axiosClient';

export const networkApi = {
  getDevices: () => axiosClient.get('/network/devices'),
  getDashboard: () => axiosClient.get('/network/dashboard'),
  getTopology: () => axiosClient.get('/network/topology'),
  getWifi: () => axiosClient.get('/network/wifi'),
  getUsers: () => axiosClient.get('/network/users'),
  getAlerts: () => axiosClient.get('/network/alerts'),
  getAnalytics: () => axiosClient.get('/network/analytics'),
};
