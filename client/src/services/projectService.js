import axios from "axios";

const API = "http://localhost:5000/api/projects";

const auth = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getProjects = async (token) => {
  const { data } = await axios.get(API, auth(token));
  return data;
};

export const createProject = async (token, project) => {
  const { data } = await axios.post(API, project, auth(token));
  return data;
};

export const updateProject = async (token, id, project) => {
  const { data } = await axios.put(`${API}/${id}`, project, auth(token));
  return data;
};

export const deleteProject = async (token, id) => {
  const { data } = await axios.delete(`${API}/${id}`, auth(token));
  return data;
};