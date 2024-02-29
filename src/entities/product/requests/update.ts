import { api } from "@lib/api";
import { ProductUpdateDTO } from "../dtos/product-update.dto";

interface UpdateProps {
  id: string;
  data: ProductUpdateDTO;
}

export async function update({ id, data }: UpdateProps) {
  await api.put("/products/" + id, data);
}
