import axios from "axios";

const API_URL = "http://localhost:3000/api/";



export const userLogin = async (credentials) => {
 
  try {

    const res = await axios.post(`${API_URL}authUser/login`, credentials, {});
    const token = res.data.token;
    return token;
  } catch (error) {
    console.error("Error en el login:", error);
    throw error;
  }
};

export const getUserById = async (token, id) => {
  console.log(id);
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.get(`${API_URL}users/${id}`, config);
    return res.data;
  } catch (error) {
    console.error("Error en traer usuarios:", error);
    throw error;
  }
};


export const familyRegister = async (familyData) => {

  console.log('entro aqui');
  console.log(familyData);

  try {
    const res = await axios.post(`${API_URL}families`, familyData, {});
    const data = res;
    return data;
  } catch (error) {
    console.error("Error en la creación:", error);
    throw error;
  }
};
export const userRegister = async (userData) => {
  console.log(userData);

  try {
    const res = await axios.post(`${API_URL}authUser/register`, userData, {});
    const data = res;
    return data;
  } catch (error) {
    console.error("Error en la creación:", error);
    throw error;
  }
};
export const updateUserById = async (token, id, userData) => {
  console.log(userData);
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.patch(`${API_URL}users/${id}`, userData, config);
    return res;
  } catch (error) {
    console.error("Error en update_User:", userData);
    throw error;
  }
};
export const updateUserDetailsById = async (token, id, userData) => {
  console.log(userData);
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.patch(`${API_URL}userDetails/${id}`, userData, config);
    return res;
  } catch (error) {
    console.error("Error en update_User:", userData);
    throw error;
  }
};





export const deleteUserById = async (id,token) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.delete(`${API_URL}users/${id}`,config);
    return res;
  } catch (error) {
    console.error("Error en update_User:", userData);
    throw error;
  }
};

export const getTasksById = async ( id) => {
  try {
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // };
    const res = await axios.get(`${API_URL}tasks/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error en recibir tasks:", error);
    throw error;
  }
};
export const getTasksByFamilyIdAndDate = async ( id, date, type) => {
  try {
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // };
    const res = await axios.get(`${API_URL}tasks/${id}/${date}/${type}`);
    return res.data.tasks;
  } catch (error) {
    console.error("Error en recibir tasks:", error);
    throw error;
  }
};
export const getTasksByFamilyAndType = async ( id, type) => {
  try {
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // };
    const res = await axios.get(`${API_URL}tasks/${id}/${type}`);
    return res.data.tasks;
  } catch (error) {
    console.error("Error en recibir tasks:", error);
    throw error;
  }
};


export const updateTaskById = async (id,taskStatusData) => {

  console.log(id);
  console.log(taskStatusData);
  try {
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // };
    const res = await axios.patch(`${API_URL}tasks/${id}`,taskStatusData);
    return res.data;
  } catch (error) {
    console.error("Error en update_tasks:", error);
    throw error;
  }
};
export const deleteTaskById = async (id) => {

  
  try {
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // };
    const res = await axios.delete(`${API_URL}tasks/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error en delete_Appointment:", error);
    throw error;
  }
};

export const createTask = async ( tasksData) => {
  console.log(tasksData);
  try {
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // };

    const res = await axios.post(`${API_URL}tasks`,tasksData);
    return res.data.newtasks;
  } catch (error) {
    console.error("Error en create tasks:", error);
    throw error;
  }
};









// <--------------------------------------------------------------------------------------------


export const getFamilyById = async (id) => {

  try {
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // };
    const res = await axios.get(`${API_URL}families/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error en el login:", error);
    throw error;
  }
};



export const getAllUsers = async ( page, skip) => {
  try {
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // };

    const res = await axios.get(
      `${API_URL}users?page=${page}&skip=${skip}`
    );
    return res.data;
  } catch (error) {
    console.error("Error en usuarios", error);
    throw error;
  }
};
