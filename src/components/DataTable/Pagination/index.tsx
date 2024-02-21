import { SelectField } from "@components/SelectField";

import { PaginationControl } from "./PaginationControl";

import { useTableSearchParams } from "@hooks/useTableSearchParams";

import { PaginationOptions } from "@entities/common/PaginationResponse";
import { TotalResults } from "./TotalResults";

interface PaginationProps {
  pagination?: PaginationOptions;
}

export function Pagination(props: PaginationProps) {
  const { pagination: _pagination } = props;

  const { changes, pagination } = useTableSearchParams();

  const { size } = pagination;
  const { changeSize } = changes;

  return (
    <div className="flex items-center justify-center">
      <div className="flex h-full w-56 items-center">
        <TotalResults pagination={_pagination} />
      </div>

      <div className="-ml-56 -mr-20 flex-1 justify-center">
        <PaginationControl pagination={_pagination} />
      </div>

      <div className="flex h-full w-20 items-center">
        <SelectField
          placeholder=""
          value={size.toString()}
          onValueChange={(value) => changeSize(parseInt(value))}
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
