import axios from 'axios';

const API_URL = 'http://localhost:5002';

export const registerUser = async (reqData) => {
  try{
    const response = await axios.post(`${API_URL}/signup`, reqData)
    return response.data;
  }catch(error){
    console.error('Error registering user:', error);
    throw error;
  }
}

export const loginUser = async (reqData) => {
  try{
    const response = await axios.post(`${API_URL}/login`, reqData)
    return response.data;
  }catch(error){
    console.error('Error while login as user:', error);
    throw error;
  }
}

export const fetchBoardsForUser = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/board/getBoardsForUser/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
};

export const fetchAllUsersForSystem = async (userId) => {
  try{
    const response = await axios.get(`${API_URL}/user/getUsersOfSystem/${userId}`);
    return response.data;
  }catch(error){
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const createBoardWithMembers = async (reqbody) => {
  try{
    const response = await axios.post(`${API_URL}/board/createBoardWithMembers`, reqbody);
    return response.data;
  }catch(error){
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const getUserInfoByUserId = async (userId) => {
  try{
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  }catch(error){
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const deleteBoardById = async (boardId) => {
  try{
    const response = await axios.delete(`${API_URL}/board/${boardId}`);
    return response.data;
  }catch(error){
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const resetPassword = async (userId, reqbody) => {
  try{
    const response = await axios.post(`${API_URL}/reset-password/${userId}`, reqbody);
    return response.data;
  }catch(error){
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const fetchBoardInfo = async (boardId) => {
  try {
    const response = await axios.get(`${API_URL}/board/${boardId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching board data:', error);
    throw error;
  }
};
