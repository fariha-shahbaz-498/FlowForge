import axios from "axios";

const BASE_URL = "https://YOUR-BACKEND-URL.com/api";

const API = axios.create({
  baseURL: `${BASE_URL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});


// REGISTER
export const registerUser = async (userData) => {
  const res = await API.post("/register", userData);
  return res.data;
};


// LOGIN
export const loginUser = async (userData) => {
  const res = await API.post("/login", userData);
  return res.data;
};


// CURRENT USER
export const getCurrentUser = async (token) => {
  const res = await API.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


// PROFILE
export const updateProfile = async (token, data) => {
  const res = await axios.put(
    `${BASE_URL}/users/profile`,
    data,
    {
      headers:{
        Authorization:`Bearer ${token}`,
      },
    }
  );

  return res.data;
};


// PASSWORD
export const changePassword = async (token, data) => {
  const res = await axios.put(
    `${BASE_URL}/users/password`,
    data,
    {
      headers:{
        Authorization:`Bearer ${token}`,
      },
    }
  );

  return res.data;
};


// PROJECTS
export const getProjects = async (token) => {
  const res = await axios.get(
    `${BASE_URL}/projects`,
    {
      headers:{
        Authorization:`Bearer ${token}`,
      },
    }
  );

  return res.data;
};


export const createProject = async (token,data) => {
  const res = await axios.post(
    `${BASE_URL}/projects`,
    data,
    {
      headers:{
        Authorization:`Bearer ${token}`,
      },
    }
  );

  return res.data;
};


export const updateProject = async (token,id,data) => {
  const res = await axios.put(
    `${BASE_URL}/projects/${id}`,
    data,
    {
      headers:{
        Authorization:`Bearer ${token}`,
      },
    }
  );

  return res.data;
};


export const deleteProject = async (token,id) => {
  const res = await axios.delete(
    `${BASE_URL}/projects/${id}`,
    {
      headers:{
        Authorization:`Bearer ${token}`,
      },
    }
  );

  return res.data;
};