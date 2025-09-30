import { useEffect, useState } from "react";

export type MeasurementArray = Array<number | null>;

export type ScalarResult = {
  avg: number | null;
  delta: number | null;
  epsilonPercent: number | null;
  n: number;
  sumSquaredDeviations: number | null;
};

export type Results = {
  diameter: ScalarResult;
  height: ScalarResult;
  density: {
    rho: number | null;
    deltaRho: number | null;
    epsilonPercent: number | null;
    pi: number;
  };
};

const ALPHA = 0.95;
const STUDENT_T: Record<number, number> = {
  // df: t_{0.975, df}
  1: 12.706,
  2: 4.303,
  3: 3.182,
  4: 2.776,
  5: 2.571,
  6: 2.447,
  7: 2.365,
  8: 2.306,
  9: 2.262,
  10: 2.228,
  11: 2.201,
  12: 2.179,
  13: 2.16,
  14: 2.145,
  15: 2.131,
  16: 2.12,
  17: 2.11,
  18: 2.101,
  19: 2.093,
  20: 2.086,
  21: 2.08,
  22: 2.074,
  23: 2.069,
  24: 2.064,
  25: 2.06,
  26: 2.056,
  27: 2.052,
  28: 2.048,
  29: 2.045,
  30: 2.042,
};
const MICROMETER = { delta: 0.01, omega: 0.01 }; // mm
const CALIPER = { delta: 0.1, omega: 0.1 }; // mm

export function useLab1() {
  const STORAGE = {
    d: "lab1:diameterMeasurements",
    h: "lab1:heightMeasurements",
    m: "lab1:massGrams",
  } as const;

  const safeParseArray = (raw: string | null, fallbackLen = 5): MeasurementArray => {
    try {
      if (!raw) return Array.from({ length: fallbackLen }, () => null);
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return Array.from({ length: fallbackLen }, () => null);
      return parsed.map((v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null));
    } catch {
      return Array.from({ length: fallbackLen }, () => null);
    }
  };

  const safeParseNumber = (raw: string | null): number | null => {
    try {
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return typeof parsed === "number" && Number.isFinite(parsed) ? parsed : null;
    } catch {
      return null;
    }
  };

  const [diameterMeasurements, setDiameterMeasurements] = useState<MeasurementArray>(() =>
    typeof window !== "undefined"
      ? safeParseArray(window.localStorage.getItem(STORAGE.d))
      : Array.from({ length: 5 }, () => null)
  );
  const [heightMeasurements, setHeightMeasurements] = useState<MeasurementArray>(() =>
    typeof window !== "undefined"
      ? safeParseArray(window.localStorage.getItem(STORAGE.h))
      : Array.from({ length: 5 }, () => null)
  );
  const [massGrams, setMassGrams] = useState<number | null>(() =>
    typeof window !== "undefined" ? safeParseNumber(window.localStorage.getItem(STORAGE.m)) : null
  );

  const [results, setResults] = useState<Results>({
    diameter: {
      avg: null,
      delta: null,
      epsilonPercent: null,
      n: 0,
      sumSquaredDeviations: null,
    },
    height: {
      avg: null,
      delta: null,
      epsilonPercent: null,
      n: 0,
      sumSquaredDeviations: null,
    },
    density: { rho: null, deltaRho: null, epsilonPercent: null, pi: 3.14159 },
  });

  const setDiameterAt = (index: number, value: number | null) => {
    setDiameterMeasurements((prev) => {
      const next = [...prev];
      next[index] = Number.isFinite(value as number) ? (value as number) : null;
      return next;
    });
  };

  const setHeightAt = (index: number, value: number | null) => {
    setHeightMeasurements((prev) => {
      const next = [...prev];
      next[index] = Number.isFinite(value as number) ? (value as number) : null;
      return next;
    });
  };

  const addDiameterRow = () =>
    setDiameterMeasurements((prev) => [...prev, null]);
  const removeDiameterRow = (index: number) =>
    setDiameterMeasurements((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev
    );

  const addHeightRow = () => setHeightMeasurements((prev) => [...prev, null]);
  const removeHeightRow = (index: number) =>
    setHeightMeasurements((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev
    );

  const validNumbers = (arr: MeasurementArray): number[] =>
    arr.filter((v): v is number => typeof v === "number" && Number.isFinite(v));

  const computeScalar = (
    values: number[],
    instrument: { delta: number; omega: number }
  ): ScalarResult => {
    const n = values.length;
    if (n === 0) {
      return {
        avg: null,
        delta: null,
        epsilonPercent: null,
        n,
        sumSquaredDeviations: null,
      };
    }
    const sum = values.reduce((acc, x) => acc + x, 0);
    const avg = sum / n;
    const deviations = values.map((x) => x - avg);
    const sumSq = deviations.reduce((acc, d) => acc + d * d, 0);
    const df = n - 1;
    const t = STUDENT_T[df] ?? STUDENT_T[30];
    const randomError = n >= 2 ? t * Math.sqrt(sumSq / (n * (n - 1))) : 0;
    const instrError = Math.sqrt(
      instrument.delta ** 2 / 3 + (0.48 * instrument.omega) ** 2
    );
    const delta = randomError + instrError || null;
    const epsilonPercent = avg && delta !== null ? (delta / avg) * 100 : null;
    return { avg, delta, epsilonPercent, n, sumSquaredDeviations: sumSq };
  };

  useEffect(() => {
    const values = validNumbers(diameterMeasurements);
    const scalar = computeScalar(values, MICROMETER);
    setResults((prev) => ({ ...prev, diameter: scalar }));
    try {
      window.localStorage.setItem(STORAGE.d, JSON.stringify(diameterMeasurements));
    } catch {}
  }, [diameterMeasurements]);

  useEffect(() => {
    const values = validNumbers(heightMeasurements);
    const scalar = computeScalar(values, CALIPER);
    setResults((prev) => ({ ...prev, height: scalar }));
    try {
      window.localStorage.setItem(STORAGE.h, JSON.stringify(heightMeasurements));
    } catch {}
  }, [heightMeasurements]);

  useEffect(() => {
    const d = results.diameter;
    const h = results.height;
    const mKg =
      massGrams && Number.isFinite(massGrams) ? massGrams / 1000 : null;

    if (!d.avg || !h.avg || !mKg) {
      setResults((prev) => ({
        ...prev,
        density: {
          rho: null,
          deltaRho: null,
          epsilonPercent: null,
          pi: prev.density.pi,
        },
      }));
      return;
    }

    const maxEps = Math.max(d.epsilonPercent ?? 0, h.epsilonPercent ?? 0, 0);
    let pi = 3.1416;
    if (maxEps > 13) pi = 3.1;
    else if (maxEps > 0.5) pi = 3.14;

    const d_m = d.avg / 1000;
    const h_m = h.avg / 1000;
    const rho = (4 * mKg) / (pi * d_m * d_m * h_m);
    const epsilonRho = Math.sqrt(
      0 ** 2 + 2 * (d.epsilonPercent ?? 0) ** 2 + (h.epsilonPercent ?? 0) ** 2
    );
    const deltaRho = (epsilonRho / 100) * rho;

    setResults((prev) => ({
      ...prev,
      density: { rho, deltaRho, epsilonPercent: epsilonRho, pi },
    }));
  }, [results.diameter, results.height, massGrams]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE.m, JSON.stringify(massGrams));
    } catch {}
  }, [massGrams]);

  return {
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
    constants: { ALPHA, STUDENT_T, MICROMETER, CALIPER },
  };
}

export default useLab1;
