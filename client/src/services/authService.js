import axios from "axios";


// Auth API

const API = axios.create({

  baseURL: "http://localhost:5000/api/auth",

  headers: {
    "Content-Type": "application/json",
  },

});




// REGISTER

export const registerUser = async (userData) => {

  const res = await API.post(
    "/register",
    userData
  );

  return res.data;

};





// LOGIN

export const loginUser = async (userData) => {

  const res = await API.post(
    "/login",
    userData
  );

  return res.data;

};






// GET CURRENT USER

export const getCurrentUser = async (token) => {


  const res = await API.get(

    "/me",

    {
      headers:{
        Authorization:`Bearer ${token}`,
      },
    }

  );


  return res.data;

};







// UPDATE PROFILE

export const updateProfile = async (token, data) => {


  const res = await axios.put(

    "http://localhost:5000/api/users/profile",

    data,

    {
      headers:{
        Authorization:`Bearer ${token}`,
      },
    }

  );


  return res.data;

};








// CHANGE PASSWORD

export const changePassword = async (token, data) => {


  const res = await axios.put(

    "http://localhost:5000/api/users/password",

    data,

    {
      headers:{
        Authorization:`Bearer ${token}`,
      },
    }

  );


  return res.data;

};
// ================= PROJECT API =================

export const getProjects = async (token) => {
  const res = await axios.get(
    "http://localhost:5000/api/projects",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const createProject = async (token, data) => {
  const res = await axios.post(
    "http://localhost:5000/api/projects",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const updateProject = async (token, id, data) => {
  const res = await axios.put(
    `http://localhost:5000/api/projects/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const deleteProject = async (token, id) => {
  const res = await axios.delete(
    `http://localhost:5000/api/projects/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};