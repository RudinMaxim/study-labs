import { useMemo } from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import MathText from "../../components/MathText";
import { useOverbeck } from "./useOverbeck";

function NumberCell({
  value,
  onChange,
  step,
  placeholder,
  invalid,
}: {
  value: number | null;
  onChange: (v: number | null) => void;
  step: number;
  placeholder: string;
  invalid?: boolean;
}) {
  return (
    <input
      type="number"
      step={step}
      className={`w-full rounded-md border bg-background px-2 py-1.5 text-sm ${
        invalid ? "border-red-500" : ""
      }`}
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(e) => {
        const raw = e.target.value;
        if (raw === "") return onChange(null);
        const n = Number(raw);
        onChange(Number.isFinite(n) ? n : null);
      }}
    />
  );
}

export default function LabOverbeck() {
  const {
    task1Rows,
    setTask1Rows,
    task1,
    task2Rows,
    setTask2Rows,
    task2Chart,
    computeI,
    validation,
  } = useOverbeck();

  const addTask1 = () =>
    setTask1Rows((prev) => [...prev, { m: null, T: null }]);
  const removeTask1 = (i: number) =>
    setTask1Rows((prev) =>
      prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev
    );

  const addTask2 = () =>
    setTask2Rows((prev) => [...prev, { m: null, T: null, r: null }]);
  const removeTask2 = (i: number) =>
    setTask2Rows((prev) =>
      prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev
    );

  const valid1 = useMemo(
    () => task1Rows.filter((r) => (r.m ?? 0) > 0 && (r.T ?? 0) > 0),
    [task1Rows]
  );
  const valid2 = useMemo(
    () =>
      task2Rows.filter(
        (r) => (r.m ?? 0) > 0 && (r.T ?? 0) > 0 && (r.r ?? -1) >= 0
      ),
    [task2Rows]
  );

  return (
    <div className="mx-auto w-full max-w-screen-lg grid gap-6 px-3 py-4">
      <div className="rounded-lg border p-3 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Обзор</h2>
        <MathText
          content={
            "Основная формула: $$I = \\frac{m g T^2 R}{4 \\pi^2} - m R^2$$ при $g=9.81\\,\\mathrm{m/s^2}$, $R=0.025\\,\\mathrm{m}$."
          }
        />
      </div>

      <div className="rounded-lg border p-3 shadow-sm">
        <h2 className="text-lg font-semibold mb-3">
          Задание I: I стержня и блока
        </h2>
        <div className="mb-2 text-xs text-muted-foreground">
          <MathText
            content={"$$I_i = \\frac{m_i G T_i^2 R}{4 \\pi^2} - m_i R^2$$"}
          />
        </div>
        <div className="grid gap-2">
          {task1Rows.map((row, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="text-xs w-12">#{i + 1}</div>
              <NumberCell
                value={row.m}
                step={0.001}
                placeholder="m (kg)"
                invalid={validation.task1.perRow[i]?.massValid === false}
                onChange={(v) =>
                  setTask1Rows((prev) =>
                    prev.map((r, idx) => (idx === i ? { ...r, m: v } : r))
                  )
                }
              />
              <NumberCell
                value={row.T}
                step={0.001}
                placeholder="T (s)"
                invalid={validation.task1.perRow[i]?.timeValid === false}
                onChange={(v) =>
                  setTask1Rows((prev) =>
                    prev.map((r, idx) => (idx === i ? { ...r, T: v } : r))
                  )
                }
              />
              <button
                className="text-red-600 text-xs px-2 py-1 border rounded"
                onClick={() => removeTask1(i)}
              >
                Удалить
              </button>
            </div>
          ))}
          <button
            className="text-sm px-3 py-1.5 border rounded w-fit"
            onClick={addTask1}
          >
            Добавить измерение
          </button>
        </div>

        {valid1.length > 0 && (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border px-1.5 py-1">#</th>
                  <th className="border px-1.5 py-1">m (kg)</th>
                  <th className="border px-1.5 py-1">T (s)</th>
                  <th className="border px-1.5 py-1">I (kg·m²)</th>
                  <th className="border px-1.5 py-1">I-⟨I⟩</th>
                  <th className="border px-1.5 py-1">(I-⟨I⟩)²</th>
                </tr>
              </thead>
              <tbody>
                {valid1.map((r, i) => {
                  const Iv = computeI(r.m as number, r.T as number);
                  const avg = task1.avgI ?? 0;
                  const dev = Iv - avg;
                  return (
                    <tr key={i}>
                      <td className="border px-1.5 py-1">{i + 1}</td>
                      <td className="border px-1.5 py-1">{r.m}</td>
                      <td className="border px-1.5 py-1">{r.T}</td>
                      <td className="border px-1.5 py-1">{Iv.toFixed(6)}</td>
                      <td className="border px-1.5 py-1">{dev.toFixed(6)}</td>
                      <td className="border px-1.5 py-1">
                        {(dev * dev).toFixed(12)}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-muted/50">
                  <td className="border px-1.5 py-1">Σ</td>
                  <td className="border px-1.5 py-1" />
                  <td className="border px-1.5 py-1" />
                  <td className="border px-1.5 py-1">
                    {task1.avgI?.toFixed(6) ?? "—"}
                  </td>
                  <td className="border px-1.5 py-1" />
                  <td className="border px-1.5 py-1">
                    {task1.sumSquared?.toFixed(12) ?? "—"}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-xs">
              I = {task1.avgI?.toFixed(6) ?? "—"} ±{" "}
              {task1.deltaI?.toFixed(6) ?? "—"} kg·m², ε ={" "}
              {task1.epsilon?.toFixed(2) ?? "—"}% (α = 0.95)
            </div>
          </div>
        )}
      </div>

      <div className="rounded-lg border p-3 shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Задание II: I(r²)</h2>
        <div className="grid gap-2">
          {task2Rows.map((row, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="text-xs w-12">#{i + 1}</div>
              <NumberCell
                value={row.m}
                step={0.001}
                placeholder="m (kg)"
                invalid={validation.task2.perRow[i]?.massValid === false}
                onChange={(v) =>
                  setTask2Rows((prev) =>
                    prev.map((r, idx) => (idx === i ? { ...r, m: v } : r))
                  )
                }
              />
              <NumberCell
                value={row.T}
                step={0.001}
                placeholder="T (s)"
                invalid={validation.task2.perRow[i]?.timeValid === false}
                onChange={(v) =>
                  setTask2Rows((prev) =>
                    prev.map((r, idx) => (idx === i ? { ...r, T: v } : r))
                  )
                }
              />
              <NumberCell
                value={row.r}
                step={0.02}
                placeholder="r (m)"
                invalid={validation.task2.perRow[i]?.rValid === false}
                onChange={(v) =>
                  setTask2Rows((prev) =>
                    prev.map((r, idx) => (idx === i ? { ...r, r: v } : r))
                  )
                }
              />
              <button
                className="text-red-600 text-xs px-2 py-1 border rounded"
                onClick={() => removeTask2(i)}
              >
                Удалить
              </button>
            </div>
          ))}
          <button
            className="text-sm px-3 py-1.5 border rounded w-fit"
            onClick={addTask2}
          >
            Добавить измерение
          </button>
        </div>

        {valid2.length >= 2 && (
          <div className="mt-3">
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <LineChart
                  data={task2Chart}
                  margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="r2"
                    tickFormatter={(v) => Number(v).toFixed(3)}
                    label={{
                      value: "r² (m²)",
                      position: "insideBottomRight",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    tickFormatter={(v) => Number(v).toExponential(2)}
                    label={{
                      value: "I (kg·m²)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip
                    formatter={(v) =>
                      typeof v === "number" ? v.toExponential(6) : v
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="I"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
