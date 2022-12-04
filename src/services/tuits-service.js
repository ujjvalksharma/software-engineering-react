import axios from "axios";
//const BASE_URL = "https://software-engineering-a1-node-a.herokuapp.com"
const BASE_URL = "http://localhost:4000"
const TUITS_API = `${BASE_URL}/tuits`;
const USERS_API = `${BASE_URL}/users`;

export const findAllTuits = () =>
  axios.get(TUITS_API)
    .then(response => response.data);

export const findTuitById = (tid) =>
  axios.get(`${TUITS_API}/${tid}`)
    .then(response => response.data);

export const findTuitByUser = (uid) => 
  axios.get(`${USERS_API}/${uid}/tuits`)
    .then(response => response.data);

export const createTuit = (uid, tuit) =>{
  console.log('new tuit creation: '+uid+'tuit: '+JSON.stringify(tuit));
  return axios.post(`${USERS_API}/${uid}/tuits`, tuit)
    .then(response => {
      console.log('response data: '+JSON.stringify(response.data));
      return response.data;
    });
  }

export const updateTuit = (tid, tuit) =>
  axios.put(`${TUITS_API}/${tid}`, tuit)
    .then(response => response.data);

export const deleteTuit = (tid) =>
  axios.delete(`${TUITS_API}/${tid}`);


    export const deleteAllTuitsByUser = (uid) =>
  axios.delete(`${USERS_API}/${uid}/tuits`)
    .then(response => response.data);
   


    const service = {
        findAllTuits,
        findTuitById,
        findTuitByUser,
        createTuit,
        updateTuit,
        deleteTuit,
        deleteAllTuitsByUser
    
    }
    
    export default service;