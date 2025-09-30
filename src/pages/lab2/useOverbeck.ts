import { useMemo, useState } from "react";

export type TTask1Row = { m: number | null; T: number | null };
export type TTask2Row = {
  m: number | null;
  T: number | null;
  r: number | null;
};

export type Task1Result = {
  IValues: number[];
  avgI: number | null;
  deltaI: number | null;
  epsilon: number | null;
  sumSquared: number | null;
};

export type Task2ChartPoint = { r2: number; I: number };

export function useOverbeck() {
  const R = 0.025; // m
  const G = 9.81;
  const PI = Math.PI;
  const STUDENT_T: Record<number, number> = {
    2: 4.303,
    3: 3.182,
    4: 2.776,
    5: 2.571,
  };

  const [task1Rows, setTask1Rows] = useState<TTask1Row[]>([
    { m: null, T: null },
    { m: null, T: null },
    { m: null, T: null },
  ]);
  const [task2Rows, setTask2Rows] = useState<TTask2Row[]>([
    { m: null, T: null, r: null },
    { m: null, T: null, r: null },
    { m: null, T: null, r: null },
  ]);

  const computeI = (m: number, T: number): number =>
    (m * G * T * T * R) / (4 * PI * PI) - m * R * R;

  const validTask1 = useMemo<Required<TTask1Row>[]>(
    () =>
      task1Rows.filter(
        (r) => (r.m ?? 0) > 0 && (r.T ?? 0) > 0
      ) as Required<TTask1Row>[],
    [task1Rows]
  );

  const task1: Task1Result = useMemo(() => {
    const n = validTask1.length;
    if (n === 0)
      return {
        IValues: [],
        avgI: null,
        deltaI: null,
        epsilon: null,
        sumSquared: null,
      };
    const IValues = validTask1.map((r) =>
      computeI(r.m as number, r.T as number)
    );
    const avgI = IValues.reduce((a, x) => a + x, 0) / n;
    const devs = IValues.map((x) => x - avgI);
    const sumSquared = devs.reduce((a, d) => a + d * d, 0);
    const df = n - 1;
    const t = STUDENT_T[df] ?? 2.776;
    const deltaI = n >= 2 ? t * Math.sqrt(sumSquared / (n * (n - 1))) : null;
    const epsilon = avgI && deltaI != null ? (deltaI / avgI) * 100 : null;
    return { IValues, avgI, deltaI, epsilon, sumSquared };
  }, [validTask1]);

  const validTask2 = useMemo<Required<TTask2Row>[]>(
    () =>
      task2Rows.filter(
        (r) => (r.m ?? 0) > 0 && (r.T ?? 0) > 0 && (r.r ?? -1) >= 0
      ) as Required<TTask2Row>[],
    [task2Rows]
  );

  const task2Chart: Task2ChartPoint[] = useMemo(() => {
    return validTask2
      .map((r) => ({
        r2: (r.r as number) * (r.r as number),
        I: computeI(r.m as number, r.T as number),
      }))
      .sort((a, b) => a.r2 - b.r2);
  }, [validTask2]);

  // Validation helpers and results
  const isStep = (r: number) =>
    Math.abs(r / 0.02 - Math.round(r / 0.02)) < 1e-9;

  const validation = {
    task1: useMemo(() => {
      const perRow = task1Rows.map((r) => {
        const massValid =
          r.m == null || (Number.isFinite(r.m) && r.m > 0.1 && r.m < 0.2);
        const timeValid = r.T == null || (Number.isFinite(r.T) && r.T > 0);
        return { massValid, timeValid };
      });
      const nValid = validTask1.length;
      return {
        perRow,
        nValid,
        tooFew: nValid < 3 && nValid > 0,
        hasOutOfRangeMass: task1Rows.some(
          (r) => typeof r.m === "number" && (r.m <= 0.1 || r.m >= 0.2)
        ),
        hasNonPositiveTime: task1Rows.some(
          (r) => typeof r.T === "number" && r.T <= 0
        ),
      };
    }, [task1Rows, validTask1.length]),
    task2: useMemo(() => {
      const perRow = task2Rows.map((r) => {
        const massValid =
          r.m == null || (Number.isFinite(r.m) && r.m > 0.1 && r.m < 0.2);
        const timeValid = r.T == null || (Number.isFinite(r.T) && r.T > 0);
        const rValid =
          r.r == null ||
          (Number.isFinite(r.r) && r.r >= 0 && r.r <= 0.2 && isStep(r.r));
        return { massValid, timeValid, rValid };
      });
      const nValid = validTask2.length;
      return {
        perRow,
        nValid,
        tooFew: nValid < 2 && nValid > 0,
        hasOutOfRangeMass: task2Rows.some(
          (r) => typeof r.m === "number" && (r.m <= 0.1 || r.m >= 0.2)
        ),
        hasNonPositiveTime: task2Rows.some(
          (r) => typeof r.T === "number" && r.T <= 0
        ),
        hasBadStep: task2Rows.some(
          (r) =>
            typeof r.r === "number" && !(r.r >= 0 && r.r <= 0.2 && isStep(r.r))
        ),
      };
    }, [task2Rows, validTask2.length]),
  } as const;

  return {
    consts: { R, G, PI, STUDENT_T },
    task1Rows,
    setTask1Rows,
    task1,
    task2Rows,
    setTask2Rows,
    task2Chart,
    computeI,
    validation,
  };
}

export default useOverbeck;
