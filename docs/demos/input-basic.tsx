export default function Demo() {
  return (
    <div className="w-full max-w-sm">
      <input
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        placeholder="请输入内容"
        type="text"
      />
    </div>
  );
}
