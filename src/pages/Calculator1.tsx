import { useMemo, useState } from "react";

export default function Calculator1() {
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const sum = useMemo(() => {
    const x = parseFloat(a || "0");
    const y = parseFloat(b || "0");
    const s = x + y;
    return Number.isFinite(s) ? s : 0;
  }, [a, b]);

  return (
    <div className="mx-auto max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4">Calculator 1: Sum</h2>
      <div className="grid gap-3">
        <input
          className="w-full rounded-md border bg-background px-3 py-2"
          placeholder="a"
          value={a}
          onChange={(e) => setA(e.target.value)}
          inputMode="decimal"
        />
        <input
          className="w-full rounded-md border bg-background px-3 py-2"
          placeholder="b"
          value={b}
          onChange={(e) => setB(e.target.value)}
          inputMode="decimal"
        />
        <div className="text-sm text-muted-foreground">Result</div>
        <div className="text-3xl font-bold">{sum}</div>
      </div>
    </div>
  );
}


