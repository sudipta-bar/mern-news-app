import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export async function registerUser(payload) {
  const { data } = await api.post("/auth/register", payload);
  return data;
}

export async function loginUser(payload) {
  const { data } = await api.post("/auth/login", payload);
  return data;
}

export async function getStories(page = 1, limit = 10) {
  const { data } = await api.get(`/stories?page=${page}&limit=${limit}`);
  return data;
}

export async function toggleBookmark(storyId) {
  const { data } = await api.post(`/stories/${storyId}/bookmark`);
  return data;
}

export default api;
