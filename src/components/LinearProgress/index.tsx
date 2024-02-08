export function LinearProgress() {
  return (
    <div className="w-full">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary-foreground">
        <div className="animate-progress origin-left-right h-full w-full bg-primary"></div>
      </div>
    </div>
  );
}
