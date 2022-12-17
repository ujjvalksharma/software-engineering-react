/**
 * @file Service file to call user api
 */
import axios from "axios";
const BASE_URL = "http://localhost:4000";
//const BASE_URL = "https://software-engineering-a1-node-a.herokuapp.com/ "
const LOGIN_API = `${BASE_URL}/auth/login`;
const SIGNUP_API = `${BASE_URL}/auth/signup`;
const PROFILE_API = `${BASE_URL}/auth/profile`;
const LOGOUT_API = `${BASE_URL}/auth/logout`;
const USERS_API = `${BASE_URL}/users`;

/**
 * Find users by id
 * @param {uid} userId of user
 * @returns user who has the id
 */
export const findUserById = (uid) =>
  axios.get(`${USERS_API}/${uid}`)
    .then(response => response.data);

/**
 * Create user
 * @param {user} new user to be created
 * @returns new user
 */
export const createUser = (user) =>
  axios.post(`${USERS_API}`, user)
    .then(response => response.data);

/**
 * Delete user by username
 * @param {username} username of the user
 * @returns delete status
 */
export const deleteUsersByUsername = (username) =>
  axios.delete(`${USERS_API}/username/${username}`)
    .then(response => response.data);


/**
 * Find user by username
 * @param {username} username of the user
 * @returns user who has the username
 */
export const findUsersByUsername = (username) =>
  axios.get(`${USERS_API}/username/${username}`)
    .then(response => {
      return response.data;
    });

/**
 * Registers the user
 * @param {user} user
 * @returns registered user
 */
export const signup = (user) =>
  axios.put(`${SIGNUP_API}`, user)
    .then(response => response.data);

/**
* Login the user
* @param {user} user
* @returns login data
*/
export const login = (user) =>
  axios.put(`${LOGIN_API}`, user)
    .then(response => {
      localStorage.setItem('profile', JSON.stringify(response.data));
      return response.data
    });

/**
 * Gets all users
 * @returns all users
 */
export const findAllUsers = () =>
  axios.get(`${USERS_API}`).then(response => response.data);


/**
 * Gets current user session
 * @returns all users
 */
export const myProfile = () =>
  axios.get(`${PROFILE_API}`).then(response => response.data);


/**
 * delete current session
 * @returns delete status
 */
export const logout = () =>
axios.get(`${LOGOUT_API}`).then(response => response.data);

const service = {
  login,
  signup,
  deleteUsersByUsername,
  findUsersByUsername,
  findUserById,
  createUser,
  findAllUsers,
  myProfile

}

export default service;