import { api } from "@lib/api";

import { CategoryCreateDTO } from "../dtos/category-create.dto";

export async function create(data: CategoryCreateDTO) {
  await api.post("/categories", data);
}
