import axios from "axios";

const clientApi = axios.create({
  baseURL: "http://localhost:3000/api",
  // just for build process, will be removed
  // baseURL: `https://notqe.vercel.app/api/usersTasks?id=${id}`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Credentials": "true",
  },
});

export default clientApi;
