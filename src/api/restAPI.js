import axios from "axios";

const restAPI = axios.create({
  // baseURL: "http://61.78.123.204:3002",
  baseURL: "http://192.168.10.222:3000",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  withCredentials: true,
});

export default restAPI;
