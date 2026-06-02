import axiosClient from './axiosClient';

export const wifiApi = {
  getNetworks: (params) => axiosClient.get('/wifi/networks', { params }),
  getClients: (params) => axiosClient.get('/wifi/clients', { params }),
  revealPassword: (id, adminPassword) =>
    axiosClient.post(`/wifi/networks/${id}/reveal-password`, { adminPassword }),
  getAccessLogs: () => axiosClient.get('/wifi/access-logs'),
  exportReport: (period = 'daily') =>
    axiosClient.get('/wifi/reports/export', { params: { period } }),
};
