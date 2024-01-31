import { Separator } from "@components/ui/separator";

interface PageHeaderProps {
  title: string;
}

export function PageHeader(props: PageHeaderProps) {
  const { title } = props;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-medium text-primary">{title}</h1>
      <Separator />
    </div>
  );
}
