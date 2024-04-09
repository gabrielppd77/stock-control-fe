import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { motion } from "framer-motion";

import { ChevronDown } from "lucide-react";

import { LoadingSpinner } from "@components/LoadingSpinner";
import { IconButton } from "@components/IconButton";

import { DataTableColumn } from "../@types/DataTableColumn";
import { DataTableOptions } from "../@types/DataTableOptions";
import { cn } from "@lib/utils";

interface BodyProps<TData> {
  data?: TData[];
  columns: DataTableColumn<TData>[];
  isLoading: boolean;
  options?: DataTableOptions<TData>;
  rowsExpanded: number[];
  onExpandRow: (rows: number[]) => void;
}

export function Body<TData>({
  data: _data,
  columns,
  isLoading,
  options,
  rowsExpanded,
  onExpandRow,
}: BodyProps<TData>) {
  const data = _data || [];

  const isRowExpandable = options?.onExpandRow ? true : false;

  function onChangeRow(index: number) {
    if (rowsExpanded.some((d) => d === index)) {
      onExpandRow([...rowsExpanded.filter((x) => x !== index)]);
    } else {
      onExpandRow([...rowsExpanded, index]);
    }
  }

  if (isLoading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columns.length}>
            <div className="flex w-full justify-center">
              <LoadingSpinner />
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (data.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            Sem resultados
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {data.map((row, index) => {
        const isExpanded = rowsExpanded.includes(index);

        return (
          <Collapsible
            key={index}
            asChild
            open={isExpanded}
            onOpenChange={() => onChangeRow(index)}
          >
            <>
              <TableRow>
                {isRowExpandable && (
                  <TableCell>
                    <CollapsibleTrigger asChild>
                      <div className="flex justify-center">
                        <IconButton>
                          <ChevronDown
                            className={cn(
                              "size-4 transition-transform",
                              isExpanded ? "rotate-180" : "rotate-0",
                            )}
                          />
                        </IconButton>
                      </div>
                    </CollapsibleTrigger>
                  </TableCell>
                )}
                {columns.map((col) => {
                  const customBodyRender = col.options?.customBodyRender;
                  return (
                    <TableCell className="whitespace-nowrap" key={col.name}>
                      {customBodyRender ? (
                        customBodyRender(row)
                      ) : (
                        <>{row[col.name]}</>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
              <CollapsibleContent asChild>
                {isRowExpandable && (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1}>
                      <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: "auto" },
                          collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{
                          duration: 0.8,
                          ease: [0.04, 0.62, 0.23, 0.98],
                        }}
                      >
                        {options?.onExpandRow(row)}
                      </motion.div>
                    </TableCell>
                  </TableRow>
                )}
              </CollapsibleContent>
            </>
          </Collapsible>
        );
      })}
    </TableBody>
  );
}
