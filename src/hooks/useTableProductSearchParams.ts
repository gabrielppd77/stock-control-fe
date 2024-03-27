import { useSearchParams } from "react-router-dom";

interface DataParams {
  supplierId: string;
  categoryId: string;
  dtEntryInitial: string;
  dtEntryEnd: string;
  dtDepartureInitial: string;
  dtDepartureEnd: string;
}

export function useTableProductSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const supplierId = searchParams.get("supplierId") || undefined;
  const categoryId = searchParams.get("categoryId") || undefined;
  const dtEntryInitial = searchParams.get("dtEntryInitial") || undefined;
  const dtEntryEnd = searchParams.get("dtEntryEnd") || undefined;
  const dtDepartureInitial =
    searchParams.get("dtDepartureInitial") || undefined;
  const dtDepartureEnd = searchParams.get("dtDepartureEnd") || undefined;

  function changePagination(data: DataParams) {
    searchParams.set("supplierId", data.supplierId);
    searchParams.set("categoryId", data.categoryId);
    searchParams.set("dtEntryInitial", data.dtEntryInitial);
    searchParams.set("dtEntryEnd", data.dtEntryEnd);
    searchParams.set("dtDepartureInitial", data.dtDepartureInitial);
    searchParams.set("dtDepartureEnd", data.dtDepartureEnd);
    setSearchParams(searchParams);
  }

  return {
    pagination: {
      supplierId,
      categoryId,
      dtEntryInitial,
      dtEntryEnd,
      dtDepartureInitial,
      dtDepartureEnd,
    },
    changePagination,
  };
}
