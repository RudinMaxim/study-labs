import { useMemo } from "react";

export default function Graph1() {
  const data = useMemo(() => Array.from({ length: 24 }, (_, i) => Math.sin(i / 3) * 40 + 50), []);
  const max = 100;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Graph 1: Simple Bars</h2>
      <div className="grid grid-cols-24 gap-1 h-48 items-end">
        {data.map((v, i) => (
          <div
            key={i}
            className="bg-primary/70 rounded-sm transition-all duration-300"
            style={{ height: `${(v / max) * 100}%` }}
            title={`${v.toFixed(1)}`}
          />
        ))}
      </div>
    </div>
  );
}


