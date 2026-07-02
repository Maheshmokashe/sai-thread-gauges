import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

export const api = axios.create({ baseURL: `${API_URL}/api`, timeout: 15000 });

export const getProducts = (params) => api.get('/products/', { params }).then((r) => r.data);
export const getProduct = (slug) => api.get(`/products/${slug}/`).then((r) => r.data);
export const getCategories = () => api.get('/categories/').then((r) => r.data);
export const postEnquiry = (payload) => api.post('/enquiries/', payload).then((r) => r.data);
