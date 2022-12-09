/**
 * @file Service file to call dislikes api
 */
import axios from "axios";
//const BASE_URL = "http://localhost:4000"
const BASE_URL = "https://software-engineering-a1-node-a.herokuapp.com/ "
const USERS_API = `${BASE_URL}/users`;
const TUITS_API = `${BASE_URL}/tuits`;

/**
 * Create like
 * @param {uid} userId of user
 * @param {tid} tuitId of tuit
 * @returns create a new like
 */
export const createLike = (uid,tid) =>
fetch(BASE_URL+'/users/'+uid+'/likes/'+tid, { method: "post" })
.then(res => res.json())

 /**
 * Delete like
 * @param {uid} userId of user
 * @param {tid} tuitId of tuit
 * @returns delete like status
 */
    export const deleteLike = (uid,tid) =>
    fetch(BASE_URL+'/users/'+uid+'/likes/'+tid, { method: "delete" })
    .then(res => res.json())

/**
 * Find tuits liked by user
 * @param {uid} userId of user
 * @returns liked tuits
 */
    export const findTuitsLikedByAUser = (uid) =>
  axios.get(`${USERS_API}/${uid}/likes`)
    .then(response => response.data);

 /**
 * Find users  that liked a tuit
 * @param {tid} tuitId of tuit
 * @returns users who liked the tuits
 */
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
