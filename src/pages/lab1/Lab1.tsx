import { useMemo } from "react";
import { useLab1 } from "./useLab1";

function NumberInputs({
  label,
  measurements,
  setAt,
  step,
  onAdd,
  onRemove,
}: {
  label: string;
  measurements: Array<number | null>;
  setAt: (i: number, v: number | null) => void;
  step: number;
  onAdd: () => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="grid gap-2">
      <div className="font-medium mb-1">{label}</div>
      {measurements.map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-2 animate-in fade-in-50 slide-in-from-bottom-1 duration-200"
        >
          <div className="w-28 text-sm text-muted-foreground">Измерение {i + 1}</div>
          <input
            type="number"
            step={step}
            className="flex-1 rounded-md border bg-background px-3 py-2 transition-colors focus:ring-2 focus:ring-primary/30 focus:border-primary hover:border-primary/50"
            value={measurements[i] ?? ""}
            onChange={(e) => {
              const val = e.target.value === "" ? null : Number(e.target.value);
              setAt(i, Number.isFinite(val as number) ? (val as number) : null);
            }}
          />
          <button
            type="button"
            className="text-red-600 text-sm px-2 py-1 border rounded transition-all hover:bg-red-50 active:scale-95"
            onClick={() => onRemove(i)}
            aria-label={`Удалить измерение ${i + 1}`}
          >
            −
          </button>
        </div>
      ))}
      <div>
        <button
          type="button"
          className="mt-1 text-sm px-3 py-1 border rounded transition-all hover:bg-accent active:scale-95"
          onClick={onAdd}
        >
          Добавить измерение
        </button>
      </div>
    </div>
  );
}

function TableStats({
  values,
  avg,
}: {
  values: number[];
  avg: number | null;
}) {
  const rows = useMemo(() => {
    if (!avg || values.length === 0) return [] as Array<{ v: number; dev: number; dev2: number }>;
    return values.map((v) => {
      const dev = v - avg;
      return { v, dev, dev2: dev * dev };
    });
  }, [values, avg]);
  const sumSq = rows.reduce((acc, r) => acc + r.dev2, 0);
  return (
    <div className="overflow-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="border px-2 py-1 text-left">№</th>
            <th className="border px-2 py-1 text-left">значение</th>
            <th className="border px-2 py-1 text-left">di - (d)</th>
            <th className="border px-2 py-1 text-left">(di - (d))²</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="border px-2 py-1">{i + 1}</td>
              <td className="border px-2 py-1">{r.v.toFixed(2)}</td>
              <td className="border px-2 py-1">{r.dev.toFixed(2)}</td>
              <td className="border px-2 py-1">{r.dev2.toFixed(4)}</td>
            </tr>
          ))}
          <tr>
            <td className="border px-2 py-1 font-medium">Σ</td>
            <td className="border px-2 py-1" />
            <td className="border px-2 py-1" />
            <td className="border px-2 py-1 font-medium">{sumSq.toFixed(4)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function Lab1() {
  const {
    diameterMeasurements,
    setDiameterAt,
    addDiameterRow,
    removeDiameterRow,
    heightMeasurements,
    setHeightAt,
    addHeightRow,
    removeHeightRow,
    massGrams,
    setMassGrams,
    results,
    constants,
  } = useLab1();

  const valid = (arr: Array<number | null>) =>
    arr.filter((v): v is number => typeof v === "number" && Number.isFinite(v));

  const dVals = valid(diameterMeasurements);
  const hVals = valid(heightMeasurements);

  return (
    <div className="mx-auto w-full max-w-screen-md grid gap-6">
      <div className="rounded-lg border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md animate-in fade-in-50 slide-in-from-bottom-2">
        <h2 className="text-xl font-semibold mb-3">Задание I: Диаметр (мм)</h2>
        <NumberInputs
          label="Ввод измерений диаметра"
          measurements={diameterMeasurements}
          setAt={setDiameterAt}
          step={0.01}
          onAdd={addDiameterRow}
          onRemove={removeDiameterRow}
        />
        {results.diameter.n > 0 && results.diameter.n < 2 && (
          <p className="text-red-600 mt-2 animate-in fade-in-50">
            Для оценки случайной погрешности нужно ≥ 2 измерений
          </p>
        )}
        {dVals.length >= 1 && (
          <div className="mt-4 animate-in fade-in-50 slide-in-from-bottom-1">
            <TableStats values={dVals} avg={results.diameter.avg} />
            <div className="mt-2 text-sm">
              <div>
                ⟨d⟩ = {results.diameter.avg?.toFixed(2) ?? "–"} мм
              </div>
              <div>
                Δd = {results.diameter.delta?.toFixed(2) ?? "–"} мм, εd = {results.diameter.epsilonPercent?.toFixed(2) ?? "–"}% (α = {constants.ALPHA})
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-lg border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md animate-in fade-in-50 slide-in-from-bottom-2">
        <h2 className="text-xl font-semibold mb-3">Задание II: Высота (мм)</h2>
        <NumberInputs
          label="Ввод измерений высоты"
          measurements={heightMeasurements}
          setAt={setHeightAt}
          step={0.1}
          onAdd={addHeightRow}
          onRemove={removeHeightRow}
        />
        {results.height.n > 0 && results.height.n < 2 && (
          <p className="text-red-600 mt-2 animate-in fade-in-50">
            Для оценки случайной погрешности нужно ≥ 2 измерений
          </p>
        )}
        {hVals.length >= 1 && (
          <div className="mt-4 animate-in fade-in-50 slide-in-from-bottom-1">
            <TableStats values={hVals} avg={results.height.avg} />
            <div className="mt-2 text-sm">
              <div>
                ⟨h⟩ = {results.height.avg?.toFixed(2) ?? "–"} мм
              </div>
              <div>
                Δh = {results.height.delta?.toFixed(2) ?? "–"} мм, εh = {results.height.epsilonPercent?.toFixed(2) ?? "–"}% (α = {constants.ALPHA})
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-lg border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md animate-in fade-in-50 slide-in-from-bottom-2">
        <h2 className="text-xl font-semibold mb-3">Задание III: Масса</h2>
        <div className="flex items-center gap-2 animate-in fade-in-50">
          <div className="w-44 text-sm text-muted-foreground">Масса m (г)</div>
          <input
            type="number"
            step={0.001}
            className="flex-1 rounded-md border bg-background px-3 py-2 transition-colors focus:ring-2 focus:ring-primary/30 focus:border-primary hover:border-primary/50"
            value={massGrams ?? ""}
            onChange={(e) => {
              const val = e.target.value === "" ? null : Number(e.target.value);
              setMassGrams(Number.isFinite(val as number) ? (val as number) : null);
            }}
          />
        </div>
      </div>

      <div className="rounded-lg border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md animate-in fade-in-50 slide-in-from-bottom-2">
        <h2 className="text-xl font-semibold mb-3">Задание IV: Плотность</h2>
        {results.density.rho == null ? (
          <p className="text-muted-foreground animate-in fade-in-50">Введите все измерения для расчёта ρ</p>
        ) : (
          <div className="grid gap-1 text-sm animate-in fade-in-50 slide-in-from-bottom-1">
            <div>π = {results.density.pi}</div>
            <div>
              ρ = {results.density.rho.toFixed(2)} кг/м³
            </div>
            <div>
              Δρ = {results.density.deltaRho?.toFixed(2)} кг/м³, ερ = {results.density.epsilonPercent?.toFixed(2)}%
            </div>
            <div className="text-muted-foreground">при α = {constants.ALPHA}</div>
          </div>
        )}
      </div>
    </div>
  );
}


