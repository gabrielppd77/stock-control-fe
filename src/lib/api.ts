import axios from "axios";

import { extractError } from "./alert";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((configs) => configs, extractError);

export { api };
