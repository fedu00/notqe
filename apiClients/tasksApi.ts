import axios from "axios";

const tasksApi = axios.create({
  baseURL: "http://localhost:3000/api/usersTasks",
  // just for build process, will be removed
  // baseURL: `https://notqe.vercel.app/api/usersTasks?id=${id}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default tasksApi;
