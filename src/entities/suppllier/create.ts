import { api } from "@lib/api";

interface RequestProps {
  data: {
    name: string;
  };
}

export async function create(props: RequestProps) {
  const { data } = props;
  await api.post("/suppliers", data);
}
