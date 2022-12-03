import axios from "axios";
//const BASE_URL = "http://my-node-express-project-env.eba-hxq4pgvm.us-east-1.elasticbeanstalk.com";
// const BASE_URL = "https://software-engineering-a1-node-a.herokuapp.com";
// const BASE_URL = "http://localhost:4000/api";
const BASE_URL = "http://localhost:4000";

const LOGIN_API = `${BASE_URL}/auth/login`;
const SIGNUP_API = `${BASE_URL}/auth/signup`;
const USERS_API = `${BASE_URL}/users`;

/*
export const createUser = (user) =>
  axios.post(`${USERS_API}`, user)
    .then(response => response.data);

export const findAllUsers = () =>
  axios.get(USERS_API)
    .then(response => response.data);

export const findUserById = (uid) =>
  axios.get(`${USERS_API}/${uid}`)
    .then(response => response.data);

export const deleteUser = (uid) =>
  axios.delete(`${USERS_API}/${uid}`)
    .then(response => response.data);

export const deleteUsersByUsername = (username) =>
  axios.get(`${USERS_API}/username/${username}/delete`)
    .then(response => response.data);

export const findUserByCredentials = (credentials) =>
  axios.post(`${LOGIN_API}`, credentials)
    .then(response => response.data);
*/

export const findUserById = (uid) =>
  axios.get(`${USERS_API}/${uid}`)
    .then(response => response.data);

    export const deleteUsersByUsername = (username) =>
  axios.delete(`${USERS_API}/username/${username}`)
    .then(response => response.data);

    export const findUsersByUsername = (username) =>
    axios.get(`${USERS_API}/username/${username}`)
      .then(response => {
    //      console.log(JSON.stringify(response.data));
          return response.data;
      });

    export const signup = (user) =>
  axios.put(`${SIGNUP_API}`, user)
    .then(response => response.data);

    export const login = (user) =>
    axios.put(`${LOGIN_API}`, user)
      .then(response => response.data);


const service = {
    login,
    signup,
    deleteUsersByUsername,
    findUsersByUsername,
    findUserById

}

export default service;