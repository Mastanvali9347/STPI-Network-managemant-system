import axiosClient from './axiosClient';

export const enterpriseApi = {
  getExtendedAnalytics: (range = '24h') =>
    axiosClient.get('/enterprise/analytics/extended', { params: { range } }),
  getInsights: () => axiosClient.get('/enterprise/insights'),
  getReport: (period = 'daily') =>
    axiosClient.get('/enterprise/reports', { params: { period } }),
  search: (q) => axiosClient.get('/enterprise/search', { params: { q } }),
  listDevices: () => axiosClient.get('/enterprise/devices'),
  getDevice: (id) => axiosClient.get(`/enterprise/devices/${id}`),
  createDevice: (data) => axiosClient.post('/enterprise/devices', data),
  updateDevice: (id, data) => axiosClient.put(`/enterprise/devices/${id}`, data),
  deleteDevice: (id) => axiosClient.delete(`/enterprise/devices/${id}`),
  toggleDevice: (id) => axiosClient.patch(`/enterprise/devices/${id}/toggle`),
};
