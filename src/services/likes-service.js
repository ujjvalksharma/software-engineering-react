import axios from "axios";
const BASE_URL = "http://localhost:4000"
const USERS_API = `${BASE_URL}/users`;
const TUITS_API = `${BASE_URL}/tuits`;


export const createLike = (uid,tid) =>
  axios.post(`${USERS_API}/${uid}/likes/${tid}`)
    .then(response => response.data);

    export const deleteLike = (uid,tid) =>
  axios.delete(`${USERS_API}/${uid}/likes/${tid}`)
    .then(response => response.data);

    export const findTuitsLikedByAUser = (uid) =>
  axios.get(`${USERS_API}/${uid}/likes`)
    .then(response => response.data);

    export const findUsersThatLikedATuid = (tid) =>
    axios.get(`${TUITS_API}/${tid}/likes`)
      .then(response => {
          console.log('response: '+JSON.stringify(response));
          return response.data;
      });
  

const service = {
    createLike,
    deleteLike,
    findTuitsLikedByAUser,
    findUsersThatLikedATuid
}

export default service;
