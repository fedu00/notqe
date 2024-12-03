import axios from "axios";

const clientApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_BASE_URL,
    "Access-Control-Allow-Credentials": "true",
  },
});

export default clientApi;
