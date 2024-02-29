import { api } from "@lib/api";
import { SupplierCreateDTO } from "../dtos/supplier-create.dto";

export async function create(data: SupplierCreateDTO) {
  await api.post("/suppliers", data);
}
