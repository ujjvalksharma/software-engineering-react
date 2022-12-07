import axios from "axios";
const BASE_URL = "http://localhost:4000"
const USERS_API = `${BASE_URL}/users`;
const TUITS_API = `${BASE_URL}/tuits`;


export const createLike = (uid,tid) =>
fetch(BASE_URL+'/users/'+uid+'/likes/'+tid, { method: "post" })
.then(res => res.json())

    export const deleteLike = (uid,tid) =>
    fetch(BASE_URL+'/users/'+uid+'/likes/'+tid, { method: "delete" })
    .then(res => res.json())


    export const findTuitsLikedByAUser = (uid) =>
  axios.get(`${USERS_API}/${uid}/likes`)
    .then(response => response.data);

    export const findUsersThatLikedATuid = (tid) =>
    axios.get(`${TUITS_API}/${tid}/likes`)
      .then(response => {
        //  console.log('response: '+JSON.stringify(response));
          return response.data;
      });
  

const service = {
    createLike,
    deleteLike,
    findTuitsLikedByAUser,
    findUsersThatLikedATuid
}

export default service;
