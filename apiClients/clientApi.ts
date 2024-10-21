import axios from "axios";

const clientApi = axios.create({
  baseURL: "http://localhost:3000/api",
  // just for build process, will be removed
  // baseURL: `https://notqe.vercel.app/api/usersTasks?id=${id}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default clientApi;
