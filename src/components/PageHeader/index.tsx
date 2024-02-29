import { Separator } from "@components/ui/separator";

interface PageHeaderProps {
  title: string;
  renderRight?: React.ReactNode;
}

export function PageHeader(props: PageHeaderProps) {
  const { title, renderRight } = props;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-4">
        <h1 className="text-3xl font-medium text-primary">{title}</h1>
        {renderRight}
      </div>
      <Separator />
    </div>
  );
}
