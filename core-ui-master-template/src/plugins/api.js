import axios from "axios";

export const HOST_URL = "http://127.0.0.1"
// export const HOST_URL = "https://atmaqa.space"
// export const BACKEND_URL = "https://api.atmaqa.space"
export const HOST_PORT = "8000"

export const api = axios.create({
  baseURL: `${HOST_URL}:${HOST_PORT}/api`,
  // baseURL: `${BACKEND_URL}/api`,
  // timeout: 20000,
  // headers:{
  //   'Content-Type': 'application/json',
  //   Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //   // Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
  // }
})

export const authToken = function () {

};