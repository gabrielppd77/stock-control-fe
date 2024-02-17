import { api } from "@lib/api";

export async function create(data: { name: string }) {
  await api.post("/suppliers", data);
}
