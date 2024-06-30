import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getHero = async () => {
  const response = await api.get("/hero");
  return response.data;
};

export const getAbout = async () => {
  const response = await api.get("/about");
  return response.data;
};

export const getSkills = async () => {
  const response = await api.get("/skills");
  return response.data;
};

export const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

export const getProjectDetails = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const getCertifications = async () => {
  const response = await api.get("/certifications");
  return response.data;
};

export const getResume = async () => {
  const response = await api.get("/resume");
  return response.data;
};
