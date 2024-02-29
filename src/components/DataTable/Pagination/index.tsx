import { SelectField } from "@components/SelectField";

import { PaginationControl } from "./PaginationControl";

import { useTableSearchParams } from "@hooks/useTableSearchParams";

import { PageOptionsPresenter } from "@entities/common/pagination.presenter";
import { TotalResults } from "./TotalResults";

interface PaginationProps {
  pagination?: PageOptionsPresenter;
}

export function Pagination(props: PaginationProps) {
  const { pagination: _pagination } = props;

  const { changes, pagination } = useTableSearchParams();

  const { size } = pagination;
  const { changeSize } = changes;

  return (
    <div className="flex items-center justify-center">
      <div className="-mr-20 flex flex-1 items-center justify-center gap-4">
        <PaginationControl pagination={_pagination} />
        <TotalResults pagination={_pagination} />
      </div>

      <div className="flex h-full w-20 items-center">
        <SelectField
          value={size.toString()}
          onChange={(value) => changeSize(parseInt(value))}
          options={[
            {
              label: "10",
              value: "10",
            },
            {
              label: "15",
              value: "15",
            },
            {
              label: "20",
              value: "20",
            },
          ]}
        />
      </div>
    </div>
  );
}
