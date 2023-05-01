import axios from "axios";

const restAPI = axios.create({
  // baseURL: "http://61.78.123.204:13585",
  // baseURL: "http://192.168.10.253:3000", //🔸사무실
  baseURL: "http://192.168.10.220:3000", //서버
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  withCredentials: true,
});

export default restAPI;
