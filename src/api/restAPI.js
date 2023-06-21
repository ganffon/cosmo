import axios from "axios";
import Cookies from "js-cookie";

const hostName = window.location.hostname;
const IPFlag = hostName.split(".")[0];
const BASE_URL = IPFlag === "192" ? process.env.REACT_APP_BASE_URL_PANEL : process.env.REACT_APP_BASE_URL;
const restAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    factory: Cookies.get("factoryID"),
    user: Cookies.get("userUID"),
  },
  withCredentials: true,
});

export default restAPI;
