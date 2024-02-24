import { api } from "@lib/api";

export async function remove(id: string) {
  await api.delete("/categories/" + id);
}
