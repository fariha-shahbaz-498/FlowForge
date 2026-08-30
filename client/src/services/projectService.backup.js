import axios from "axios";

const BASE_URL = "https://flow-forge-one-virid.vercel.app/api/projects";

// GET ALL PROJECTS
export const getProjects = async (token) => {
  const res = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// CREATE PROJECT
export const createProject = async (token, projectData) => {
  const res = await axios.post(BASE_URL, projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// UPDATE PROJECT
export const updateProject = async (token, id, projectData) => {
  const res = await axios.put(`${BASE_URL}/${id}`, projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// DELETE PROJECT
export const deleteProject = async (token, id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};