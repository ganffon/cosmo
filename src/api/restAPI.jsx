import axios from "axios";

const restAPI = axios.create({
  // baseURL: "http://192.168.10.220:3000",
  baseURL: "http://61.78.123.204:3002",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  withCredentials: true,
});

export default restAPI;
