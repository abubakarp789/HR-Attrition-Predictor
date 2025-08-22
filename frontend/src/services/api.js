import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
});

export const apiService = {
  // Health check
  healthCheck: () => api.get('/health'),

  // Dataset operations
  getDatasetOverview: () => api.get('/dataset-overview'),

  // Model operations
  getModelMetrics: () => api.get('/model-metrics'),

  // Clustering operations
  getClusterProfiles: () => api.get('/cluster-profiles'),

  // Images
  getAvailableImages: () => api.get('/available-images'),
  getImageUrl: (filename) => `${API_BASE_URL}/images/${filename}`,

  // Predictions
  predictTurnover: (formData) => api.post('/predict', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),

  predictSample: () => {
    const formData = new FormData();
    formData.append('use_sample', 'true');
    return api.post('/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default apiService;
