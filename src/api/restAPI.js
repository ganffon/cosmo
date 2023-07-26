import axios from "axios";
import Cookies from "js-cookie";

const hostName = window.location.hostname;
const IPFlag = hostName.split(".")[0];
let BASE_URL;
// console.log(`IPFlag : ${IPFlag}`);
switch (IPFlag) {
  case "192":
    BASE_URL = process.env.REACT_APP_BASE_URL_PANEL;
    break;
  case "51":
    BASE_URL = process.env.REACT_APP_BASE_URL;
    break;
  case "61":
    BASE_URL = process.env.REACT_APP_BASE_URL;
    break;
  case "localhost":
    BASE_URL = process.env.REACT_APP_BASE_URL;
    break;
  default:
    BASE_URL = process.env.REACT_APP_BASE_URL_DOMAIN;
}
// const BASE_URL = IPFlag === "192" ? process.env.REACT_APP_BASE_URL_PANEL : process.env.REACT_APP_BASE_URL;
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
