import api from './client';

export const getFullPortfolio = () => api.get('/api/portfolio');
export const submitContactMessage = (data) => api.post('/api/contact', data);
export const getSingleProject = (idOrSlug) => api.get(`/api/projects/${idOrSlug}`);

export const loginAdmin = (credentials) => api.post('/api/auth/login', credentials);
export const getAdminMe = () => api.get('/api/auth/me');
export const updateAdminPassword = (data) => api.put('/api/auth/password', data);

export const updateProfile = (data) => api.put('/api/profile', data);
export const updateAbout = (data) => api.put('/api/profile/about', data);

export const getSkills = () => api.get('/api/skills');
export const createSkill = (data) => api.post('/api/skills', data);
export const updateSkill = (id, data) => api.put(`/api/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/api/skills/${id}`);

export const getServices = () => api.get('/api/services');
export const createService = (data) => api.post('/api/services', data);
export const updateService = (id, data) => api.put(`/api/services/${id}`, data);
export const deleteService = (id) => api.delete(`/api/services/${id}`);

export const getProjects = (params) => api.get('/api/projects', { params });
export const createProject = (data) => api.post('/api/projects', data);
export const updateProject = (id, data) => api.put(`/api/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/api/projects/${id}`);

export const getExperiences = (params) => api.get('/api/experience', { params });
export const createExperience = (data) => api.post('/api/experience', data);
export const updateExperience = (id, data) => api.put(`/api/experience/${id}`, data);
export const deleteExperience = (id) => api.delete(`/api/experience/${id}`);

export const getTestimonials = () => api.get('/api/testimonials');
export const createTestimonial = (data) => api.post('/api/testimonials', data);
export const updateTestimonial = (id, data) => api.put(`/api/testimonials/${id}`, data);
export const deleteTestimonial = (id) => api.delete(`/api/testimonials/${id}`);

export const getMessages = (params) => api.get('/api/contact/messages', { params });
export const updateMessage = (id, data) => api.put(`/api/contact/messages/${id}`, data);
export const deleteMessage = (id) => api.delete(`/api/contact/messages/${id}`);

export const getSettings = () => api.get('/api/settings');
export const updateSettings = (data) => api.put('/api/settings', data);

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const deleteUploadedFile = (data) => api.delete('/api/upload', { data });
