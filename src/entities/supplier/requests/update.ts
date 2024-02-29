import { api } from "@lib/api";
import { SupplierUpdateDTO } from "../dtos/supplier-update.dto";

interface UpdateProps {
  id: string;
  data: SupplierUpdateDTO;
}

export async function update({ id, data }: UpdateProps) {
  await api.put("/suppliers/" + id, data);
}
