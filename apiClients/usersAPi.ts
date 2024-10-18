import axios from "axios";

const usersApi = axios.create({
  baseURL: "/api/users",
  headers: {
    "Content-Type": "application/json",
  },
});

export default usersApi;
