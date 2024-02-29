import { api } from "@lib/api";
import { ProductCreateDTO } from "../dtos/product-create.dto";

interface CreateProps {
  data: ProductCreateDTO;
  replicate: number;
}

export async function create({ data, replicate }: CreateProps) {
  await api.post("/products", data, {
    params: {
      replicate,
    },
  });
}
