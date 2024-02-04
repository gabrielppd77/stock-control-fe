import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  (configs) => configs,
  (err) => console.error(err),
);

export { api };
