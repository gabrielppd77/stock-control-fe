import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { useTheme } from "@hooks/useTheme";

export function Home() {
  const { toggleTheme } = useTheme();
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-medium text-primary">Bem vindo</h1>

      <Separator />

      <Button onClick={toggleTheme}>HERE</Button>
    </div>
  );
}
