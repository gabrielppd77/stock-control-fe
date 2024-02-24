import { api } from "@lib/api";

export async function update(data: { id: string; name: string }) {
  const { id, ...rest } = data;
  await api.put("/categories/" + id, rest);
}
