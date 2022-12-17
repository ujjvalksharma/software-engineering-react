/**
 * @file Service file to call dislikes api
 */
import axios from "axios";
const BASE_URL = "http://localhost:4000"
//const BASE_URL = "https://software-engineering-a1-node-a.herokuapp.com/ "
const USERS_API = `${BASE_URL}/users`;
const TUITS_API = `${BASE_URL}/tuits`;

/**
 * Create dislike
 * @param {uid} userId of user
 * @param {tid} tuitId of tuit
 * @returns create a new dislike
 */
export const createDislike = (uid,tid) =>
  axios.post(`${USERS_API}/${uid}/dislikes/${tid}`)
    .then(response => response.data);

 /**
 * Delete dislike
 * @param {uid} userId of user
 * @param {tid} tuitId of tuit
 * @returns delete dislike
 */
    export const deleteDislike = (uid,tid) =>
    fetch(BASE_URL+'/users/'+uid+'/dislikes/'+tid, { method: "delete" })
    .then(res => res.json())

/**
 * Find tuits disliked by user
 * @param {uid} userId of user
 * @returns delete dislike
 */
    export const findTuitsDislikedByAUser = (  uid) =>
  axios.get(`${USERS_API}/${uid}/dislikes`)
    .then(response => response.data);

    /**
 * Find users  that disliked a tuit
 * @param {tid} tuitId of tuit
 * @returns delete dislike
 */
    export const findUsersThatDislikedATuid = (tid) =>
    axios.get(`${TUITS_API}/${tid}/dislikes`)
      .then(response => {
          return response.data;
      });
  

const service = {
    createDislike,
    deleteDislike,
    findTuitsDislikedByAUser,
    findUsersThatDislikedATuid
}

export default service;
