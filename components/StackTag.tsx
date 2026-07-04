export default function StackTag({
  label,
  size = "md",
}: {
  label: string;
  size?: "sm" | "md";
}) {
  const padding = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-caps";
  return (
    <span
      className={`inline-block border border-line font-mono uppercase tracking-[0.1em] text-muted ${padding}`}
    >
      {label}
    </span>
  );
}
