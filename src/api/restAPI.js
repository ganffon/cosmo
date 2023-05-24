// import * as dotenv from "dotenv";
import axios from "axios";
import Cookies from "js-cookie";
// dotenv.config();

const BASE_URL = process.env.REACT_APP_BASE_URL;
const restAPI = axios.create({
  // baseURL: "http://192.168.10.220:3000", //Dev 내부
  // baseURL: "http://192.168.10.220:3001", //DKC 내부
  // baseURL: "http://61.78.123.204:3002", //DEV 외부
  // baseURL: "http://61.78.123.204:3003", //DKC 외부
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    factory: Cookies.get("factoryID"),
    user: Cookies.get("userUID"),
  },
  withCredentials: true,
});

export default restAPI;
