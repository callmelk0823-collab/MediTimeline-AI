import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 20000,
  withCredentials: true,
});

export const login = async (username: string, password: string, code?: string) => {
  const { data } = await api.post('/auth/login', { username, password, code });
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get('/auth/me');
  return data.data;
};

export const logout = async () => {
  const { data } = await api.post('/auth/logout');
  return data;
};

export const getDashboardStats = async () => {
  const { data } = await api.get('/dashboard/stats');
  return data.data;
};

export const getPatients = async () => {
  const { data } = await api.get('/patients');
  return data.data;
};

export const getPatientById = async (id: string) => {
  const { data } = await api.get(`/patients/${id}`);
  return data.data;
};

export const getDocuments = async () => {
  const { data } = await api.get('/documents');
  return data.data;
};

export const getDocumentById = async (id: string) => {
  const { data } = await api.get(`/documents/${id}`);
  return data.data;
};

export const getTimeline = async () => {
  const { data } = await api.get('/timeline');
  return data.data;
};

export const getPatientTimeline = async (id: string) => {
  const { data } = await api.get(`/patients/${id}/timeline`);
  return data.data;
};

export const processDocument = async (id: string) => {
  const { data } = await api.post(`/documents/${id}/process`);
  return data.data;
};
