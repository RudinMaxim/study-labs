import { useMemo, useState } from "react";

export default function Lab2() {
  const [value, setValue] = useState<string>("");
  const [percent, setPercent] = useState<string>("10");
  const result = useMemo(() => {
    const v = parseFloat(value || "0");
    const p = parseFloat(percent || "0");
    const r = v * (1 + p / 100);
    return Number.isFinite(r) ? r : 0;
  }, [value, percent]);

  return (
    <div className="mx-auto max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4">Calculator 2: Percentage</h2>
      <div className="grid gap-3">
        <input
          className="w-full rounded-md border bg-background px-3 py-2"
          placeholder="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          inputMode="decimal"
        />
        <input
          className="w-full rounded-md border bg-background px-3 py-2"
          placeholder="percent %"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
          inputMode="decimal"
        />
        <div className="text-sm text-muted-foreground">Result</div>
        <div className="text-3xl font-bold">{result}</div>
      </div>
    </div>
  );
}


