import { api } from "@lib/api";

export async function update(data: { id: string; name: string }) {
  await api.put("/suppliers/" + data.id, data);
}
