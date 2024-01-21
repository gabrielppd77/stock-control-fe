import { LogOut, User } from "lucide-react";

export function Profile() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-50">
        <User className="h-10 w-10 text-violet-500" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-zinc-700">
          Gabriel Domingos
        </span>
        <span className="truncate text-sm text-zinc-500">
          gabrielppd77@outlook.com
        </span>
      </div>
      <button type="button" className="ml-auto rounded-md hover:bg-zinc-50">
        <LogOut className="h-5 w-5 text-zinc-500" />
      </button>
    </div>
  );
}
