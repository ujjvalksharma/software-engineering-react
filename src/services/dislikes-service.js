import axios from "axios";
const BASE_URL = "http://localhost:4000"
const USERS_API = `${BASE_URL}/users`;
const TUITS_API = `${BASE_URL}/tuits`;


export const createDislike = (uid,tid) =>
  axios.post(`${USERS_API}/${uid}/dislikes/${tid}`)
    .then(response => response.data);

    export const deleteDislike = (uid,tid) =>
  axios.delete(`${USERS_API}/${uid}/dislikes/${tid}`)
    .then(response => response.data);

    export const findTuitsDislikedByAUser = (  uid) =>
  axios.get(`${USERS_API}/${uid}/dislikes`)
    .then(response => response.data);

    export const findUsersThatDislikedATuid = (tid) =>
    axios.get(`${TUITS_API}/${tid}/likes`)
      .then(response => {
          console.log('response: '+JSON.stringify(response));
          return response.data;
      });
  

const service = {
    createDislike,
    deleteDislike,
    findTuitsDislikedByAUser,
    findUsersThatDislikedATuid
}

export default service;
