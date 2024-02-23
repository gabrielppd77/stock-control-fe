import { PaginationOptions } from "@entities/common/PaginationResponse";

interface TotalResultsProps {
  pagination?: PaginationOptions;
}

export function TotalResults(props: TotalResultsProps) {
  const { pagination } = props;

  const length = pagination?.length || 0;
  const startIndex = (pagination?.startIndex || 0) + 1;
  const endIndex = (pagination?.endIndex || 0) + 1;

  return (
    <span className="text-sm text-gray-700 dark:text-gray-400">
      <span className="font-semibold text-gray-900 dark:text-white">
        {startIndex}
      </span>
      /
      <span className="font-semibold text-gray-900 dark:text-white">
        {endIndex}
      </span>{" "}
      -{" "}
      <span className="font-semibold text-gray-900 dark:text-white">
        {length}
      </span>
    </span>
  );
}
