import axios from "axios";

/** 
 * base url to make requests to the the movie database 
 */
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
});

export default instance;
