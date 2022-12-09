/**
 * @file Service file to call tuit api
 */
import axios from "axios";
//const BASE_URL = "http://localhost:4000"
const BASE_URL = "https://software-engineering-a1-node-a.herokuapp.com/ "
const TUITS_API = `${BASE_URL}/tuits`;
const USERS_API = `${BASE_URL}/users`;

/**
 * Find all tuits
 * @returns all tuits
 */
export const findAllTuits = () =>
  axios.get(TUITS_API)
    .then(response => response.data);

/**
 * Find all tuits
 * @returns all tuits
 */
export const findTuitById = (tid) =>
  axios.get(`${TUITS_API}/${tid}`)
    .then(response => response.data);
/**
 * Find tuits by user 
 * @param {uid} userId of user
 * @returns tuits of the user
 */
export const findTuitByUser = (uid) => 
  axios.get(`${USERS_API}/${uid}/tuits`)
    .then(response => response.data);

/**
 * Create tuit
 * @param {uid} userId of user
 * @param {tid} tuitId of tuit
 * @returns tuits of the user
 */
export const createTuit = (uid, tuit) =>{
 // console.log('new tuit creation: '+uid+'tuit: '+JSON.stringify(tuit));
  return axios.post(`${USERS_API}/${uid}/tuits`, tuit)
    .then(response => {
 //     console.log('response data: '+JSON.stringify(response.data));
      return response.data;
    });
  }

/**
 * Update tuit
 * @param {tuit} tuitId of the tuit which has to be updated
 * @param {tuit} updated tuit
 * @returns tuits of the user
 */
export const updateTuit = (tid, tuit) =>
  axios.put(`${TUITS_API}/${tid}`, tuit)
    .then(response => response.data);

/**
 * Delete tuit
 * @param {tid} tuit id
 * @returns delete status
 */
export const deleteTuit = (tid) =>
  axios.delete(`${TUITS_API}/${tid}`);

/**
 * Delete All tuits by user
 * @param {uid} user id
 * @returns delete status
 */
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