import { api } from "@lib/api";
import { CategoryUpdateDTO } from "../dtos/category-update.dto";

interface UpdateProps {
  id: string;
  data: CategoryUpdateDTO;
}

export async function update({ id, data }: UpdateProps) {
  await api.put("/categories/" + id, data);
}
